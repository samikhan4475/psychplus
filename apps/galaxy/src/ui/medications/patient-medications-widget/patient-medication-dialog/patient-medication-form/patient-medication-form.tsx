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
import { Prescription, TransmitResult } from '../../types'
import { getInitialValuesPatientMedication } from '../../utils'
import { ConfirmMedication } from '../confirm-medication'
import { CredentialsVerificationForm } from '../credentials-verification'
import { PrescriptionComplete } from '../prescription-complete'
import { ReviewPrescription } from '../review-prescription'
import { Step, StepComponentProps } from '../types'
import { FormFields } from './form-fields'
import { PatientMedicationSchemaType, schema } from './schema'

interface PatientMedicationFormProps extends StepComponentProps {
  onClose?: (updateLocation?: PatientMedicationSchemaType) => void
  prescription?: Prescription
  patientId: number
  transmissionResult?: TransmitResult[]
}

const PatientMedicationForm = ({
  onClose,
  prescription,
  patientId,
  ...stepProps
}: PatientMedicationFormProps) => {
  const { refetch } = useStore((state) => ({
    refetch: state.refetch,
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

  const addUpdatePrecriptions = (payloads: Partial<Prescription>[]) =>
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
            setPrescriptions((prev) => [...prev, response.data])
          }
        }
      }),
    )

  const onSubmit = async (data: PatientMedicationSchemaType) => {
    const payloads = transformOutPatientMedication(
      data,
      patientId,
      Number(appointmentId),
    )
    const results = await addUpdatePrecriptions(payloads)
    const errorResult = results.find((result) => result?.state === 'error')
    if (errorResult) {
      form.setValue('isReviewing', false)
      return toast.error(errorResult?.error)
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
