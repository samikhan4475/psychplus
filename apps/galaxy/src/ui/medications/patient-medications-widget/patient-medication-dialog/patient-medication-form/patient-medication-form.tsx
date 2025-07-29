'use client'

import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { FormContainer } from '@/components'
import { AlertDialog } from '@/ui/alerts'
import { addPatientPrescriptions, prescribingSignInAction } from '../../actions'
import { updatePatientMedicationsAction } from '../../actions/update-patient-medication'
import { useStore } from '../../store'
import { transformOutPatientMedication } from '../../transform'
import { EditOptions, Prescription, TransmitResult } from '../../types'
import { getInitialValuesPatientMedication } from '../../utils'
import { ConfirmMedication } from '../confirm-medication'
import { CredentialsVerificationForm } from '../credentials-verification'
import { PrescriptionComplete } from '../prescription-complete'
import { ReviewPrescription } from '../review-prescription'
import { Step, StepComponentProps, StepContext } from '../types'
import { FormFields } from './form-fields'
import { PatientMedicationSchemaType, schema } from './schema'

interface PatientMedicationFormProps extends StepComponentProps {
  onClose?: (updateLocation?: PatientMedicationSchemaType) => void
  prescription?: Prescription
  patientId: number
  transmissionResult?: TransmitResult[]
  editOptions?: EditOptions
}

const PatientMedicationForm = ({
  onClose,
  prescription,
  patientId,
  editOptions,
  ...stepProps
}: PatientMedicationFormProps) => {
  const { refetch, setHasControlledMedication } = useStore((state) => ({
    refetch: state.refetch,
    setHasControlledMedication: state.setHasControlledMedication,
  }))
  const Component = useMemo(() => Components[stepProps.step], [stepProps.step])
  const [isOpen, setIsOpen] = useState(false)
  const [isTransmitting, setIsTransmitting] = useState(false)
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([])
  const [errorMessage, setErrorMessage] = useState('')
  const searchParams = useSearchParams()
  const appointmentId = searchParams.get('id') ?? 105471
  const [wasCompleteStep, setWasCompleteStep] = useState(false)
  const form = useForm<PatientMedicationSchemaType>({
    resolver: zodResolver(schema),
    mode: 'onChange',
    defaultValues: getInitialValuesPatientMedication(prescription),
  })
  const [transmissionResult, setTransmissionResult] = useState<Prescription[]>(
    [],
  )
  const [stepContext, setStepContext] = useState<StepContext>({})

  const { setValue } = form

  useEffect(() => {
    if (prescription) {
      setPrescriptions([prescription])
    }
  }, [prescription])

  useEffect(() => {
    if (prescription?.pharmacyNcpdpId) {
      setValue('pharmacyNcpdpId', prescription.pharmacyNcpdpId)
    }
    if (prescription?.prescriptionPharmacyName) {
      setValue(
        'prescriptionPharmacyName',
        prescription.prescriptionPharmacyName,
      )
    }
  }, [prescription, setValue])

  useEffect(() => {
    if (stepProps.step === Step.Complete) {
      setWasCompleteStep(true)
    }
  }, [stepProps.step])

  useEffect(() => {
    if (stepProps.step === Step.Form && wasCompleteStep) {
      form.reset(getInitialValuesPatientMedication())
      setPrescriptions([])
      setWasCompleteStep(false)
    }
  }, [stepProps.step, wasCompleteStep])
  useEffect(() => {
    if (prescription?.prescribedStatus) {
      setValue('prescribedStatus', prescription.prescribedStatus)
    } else {
      setValue('prescribedStatus', 'Pharmacy')
    }
  }, [prescription, setValue])
  const addUpdatePrecriptions = (
    payloads: Partial<Prescription>[],
    options?: EditOptions,
  ) =>
    Promise.all(
      payloads.map(async (item, ind) => {
        if (item?.id) {
          const response = await updatePatientMedicationsAction({
            patientId,
            id: item.id,
            payload: item,
          })
          if (response?.state === 'error') return response
          if (response?.data) {
            const index = prescriptions?.findIndex(
              (prescription) => prescription?.id === response.data.id,
            )
            if (index !== -1) {
              prescriptions[index] = response.data
              setPrescriptions([...prescriptions])
            }
          }
        } else {
          const response = await addPatientPrescriptions(item)
          if (response?.state === 'error') return response
          if (response?.data) {
            const { drugs } = getInitialValuesPatientMedication(response?.data)
            form.setValue(`drugs.${ind}`, drugs?.[0])
            const newPrescription = response.data
            setPrescriptions((prev) =>
              options?.rePrescribe
                ? [newPrescription]
                : [...prev, newPrescription],
            )
          }
        }
      }),
    )

  const onSubmit = async (data: PatientMedicationSchemaType) => {
    let payloads = transformOutPatientMedication(
      data,
      patientId,
      Number(appointmentId),
    )
    payloads = payloads.map((prescription) => ({
      ...prescription,
      prescriptionDrugs:
        prescription.prescriptionDrugs?.map((drug) => ({
          ...drug,
          isSubstitutionsAllowed:
            drug.isSubstitutionsAllowed !== undefined
              ? drug.isSubstitutionsAllowed
              : false,
        })) ?? [],
    }))
    if (editOptions?.rePrescribe) {
      payloads = payloads.map(({ id, ...rest }) => rest)
    }
    const results = await addUpdatePrecriptions(payloads, editOptions)
    const errorResult = results.find((result) => result?.state === 'error')
    if (errorResult) {
      form.setValue('isReviewing', false)
      return toast.error(errorResult?.error)
    }

    const hasControlled = payloads.some((prescription) =>
      prescription.prescriptionDrugs?.some(
        (drug) => drug.isControlledSubstance,
      ),
    )
    if (hasControlled) {
      setHasControlledMedication(true)
    }

    if (data?.isReviewing) {
      form.setValue('isReviewing', false)
      return stepProps.onJump(Step.Review)
    }
    toast.success(
      `Prescription ${prescription?.id ? 'Updated' : 'Added'} Successfully`,
    )
    refetch()
    onClose?.()
  }
  const handleTransmit = async () => {
    setIsTransmitting(true)

    const categorizePrescriptions = (prescriptions: Prescription[]) => {
      const nonControlled: Prescription[] = []
      const controlled: Prescription[] = []
      prescriptions.forEach((item) => {
        if (!Array.isArray(item.prescriptionDrugs)) return
        const hasControlled = item.prescriptionDrugs.some(
          (d) => d?.isControlledSubstance,
        )
        if (hasControlled) controlled.push(item)
        else nonControlled.push(item)
      })

      return { nonControlled, controlled }
    }

    const transmitBatch = async (batch: Prescription[]) => {
      if (!batch.length) return 'success'
      const ids = batch.map((p) => p.id)
      const response = await prescribingSignInAction(ids)
      if (response.state === 'error') {
        toast.error(response.error)
        return 'error'
      }

      const validationErrors = response.data?.find(
        (d) => d.validationErrors?.length,
      )?.validationErrors
      if (validationErrors) {
        setIsOpen(true)
        setErrorMessage(validationErrors.join('\n') ?? '')
        return 'error'
      }
      setTransmissionResult(response.data)
      const messageId = response.data?.[0]?.id
      if (messageId) {
        toast.success(`Transmitted Successfully — Message ID: ${messageId}`)
      } else {
        toast.success('Transmitted Successfully')
      }
      return 'success'
    }

    const { nonControlled, controlled } = categorizePrescriptions(prescriptions)

    const result = await transmitBatch(nonControlled)
    if (result === 'error') {
      setIsTransmitting(false)
      return
    }

    stepProps.onJump(
      controlled.length ? Step.CredentialVerification : Step.Complete,
    )
    setIsTransmitting(false)
  }

  return (
    <FormContainer
      disabled={form.formState.isSubmitting}
      form={form}
      onSubmit={onSubmit}
    >
      <Component
        {...stepProps}
        prescriptions={prescriptions}
        onTransmit={handleTransmit}
        isTransmiting={isTransmitting}
        transmissionResult={transmissionResult}
        onClose={onClose}
        stepContext={stepContext}
        setStepContext={setStepContext}
        onJump={(nextStep) => {
          if (stepProps?.step === Step.Form && nextStep === Step.Review) {
            return form.handleSubmit(onSubmit)()
          }
          stepProps.onJump(nextStep)
        }}
      />
      <AlertDialog
        title="Validation Error"
        message={errorMessage}
        open={isOpen}
        onOpenChange={setIsOpen}
        disableClose
      />
    </FormContainer>
  )
}

const Components: Record<Step, React.ComponentType<StepComponentProps>> = {
  [Step.Form]: FormFields,
  [Step.Review]: ReviewPrescription,
  [Step.CredentialVerification]: CredentialsVerificationForm,
  [Step.OrderConfirm]: ConfirmMedication,
  [Step.Complete]: PrescriptionComplete,
}
export { PatientMedicationForm }
