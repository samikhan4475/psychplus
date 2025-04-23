'use client'

import React, { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { Flex, Grid, ScrollArea } from '@radix-ui/themes'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { FormContainer } from '@/components'
import { AlertDialog } from '@/ui/alerts'
import { getIcd10Diagnosis } from '@/ui/diagnosis/diagnosis/actions/get-service-diagnosis'
import { addPatientPrescriptions, prescribingSignInAction } from '../../actions'
import { updatePatientMedicationsAction } from '../../actions/update-patient-medication'
import { useStore } from '../../store'
import { transformOutPatientMedication } from '../../transform'
import { Prescription } from '../../types'
import { getFieldName, getInitialValuesPatientMedication } from '../../utils'
import { FavoriteView, SearchDrugs } from '../shared'
import { DrugInteractionAccordian } from './drug-interaction-accordian'
import { PrescriptionAccordian } from './prescription-accordian'
import { SaveButton } from './save-button'
import { PatientMedicationSchemaType, schema } from './schema'
import { SignButton } from './sign-button'
import { TogglePrescribed } from './toggle-prescribed'

interface PatientMedicationFormProps {
  onClose?: (updateLocation?: PatientMedicationSchemaType) => void
  prescription?: Prescription
  patientId: number
}

const PatientMedicationForm = ({
  onClose,
  prescription,
  patientId,
}: PatientMedicationFormProps) => {
  const { refetch, setDiagnosisLoading } = useStore((state) => ({
    refetch: state.refetch,
    setDiagnosisLoading: state.setDiagnosisLoading,
  }))
  const [isOpen, setIsOpen] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const searchParams = useSearchParams()
  const appointmentId = searchParams.get('id') ?? ''
  const form = useForm<PatientMedicationSchemaType>({
    resolver: zodResolver(schema),
    mode: 'onChange',
    defaultValues: getInitialValuesPatientMedication(prescription),
  })
  const onSubmit = async (data: PatientMedicationSchemaType) => {
    const payload = transformOutPatientMedication(
      data,
      patientId,
      appointmentId,
    )
    const results = await Promise.all(
      payload.map(async (payload, index) =>
        payload?.id
          ? updatePatientMedicationsAction({
            patientId,
            id: payload?.id,
            payload,
          }).then(async (res) => {
            if (res.state === 'error') return res
            console.log('Update', {
              payload,
              response: res?.data,
            })
            if (payload?.id && data.isSigning) {
              return await prescribingSignInAction([payload?.id])
            }
            return res
          })
          : addPatientPrescriptions(payload).then(async (res) => {
            if (res.state === 'error') return res
            console.log('Create', {
              payload,
              response: res?.data,
            })
            if (res?.data?.id && data.isSigning) {
              const drug = getInitialValuesPatientMedication(res?.data)
              form.setValue(`drugs.${index}`, drug?.drugs?.[0])
              return await prescribingSignInAction([res?.data?.id])
            }
            return res
          }),
      ),
    )
    const errorResult = results.find((result) => result.state === 'error')
    if (errorResult) {
      if (errorResult.status) {
        const message = errorResult?.error
        setErrorMessage(message)
        form.setValue('isSigning', false)
        return setIsOpen(true)
      }
      form.setValue('isSigning', false)
      return toast.error(errorResult?.error)
    }
    toast.success(
      `Prescription ${prescription?.id ? 'Updated' : 'Added'} Successfully`,
    )
    refetch()
    onClose?.()
  }

  const diagnosisCodes = useMemo(
    () =>
      prescription?.prescriptionDiagnoses?.map((item) =>
        String(item.diagnosisCode),
      ) ?? [],
    [prescription?.prescriptionDiagnoses],
  )
  useEffect(() => {
    if (diagnosisCodes?.length) {
      setDiagnosisLoading(true)
      getIcd10Diagnosis({ DiagnosisCodes: diagnosisCodes })
        .then((res) => {
          if (res.state === 'error') {
            setDiagnosisLoading(false)
            return toast.error(res.error)
          }
          const diagnosisData = res?.data?.map((item) => ({
            id: prescription?.prescriptionDiagnoses.find(
              (el) => el.diagnosisCode === item.code,
            )?.id,
            code: item?.code,
            description: item?.description,
          }))
          form.setValue(getFieldName(0, 'diagnosis'), diagnosisData)
        })
        .finally(() => {
          setDiagnosisLoading(false)
        })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [diagnosisCodes])

  return (
    <FormContainer
      disabled={form.formState.isSubmitting}
      form={form}
      onSubmit={onSubmit}
    >
      <Flex gap="2" justify="between" direction="column" className="relative">
        <Grid columns="2" gap="2">
          <Flex direction="column" gap="1" flexGrow="1">
            <TogglePrescribed />
            < SearchDrugs />
            <ScrollArea
              scrollbars="vertical"
              className="max-h-[70dvh] overflow-visible pr-2"
            >
              <DrugInteractionAccordian />
              <PrescriptionAccordian />
            </ScrollArea>
          </Flex>
          <FavoriteView />
        </Grid>
        <Flex gap="2" justify="end">
          <SaveButton />
          <SignButton onSubmit={onSubmit} />
        </Flex>
      </Flex >
      <AlertDialog
        title="Validation Error"
        message={errorMessage}
        open={isOpen}
        onOpenChange={setIsOpen}
        disableClose
      />
    </FormContainer >
  )
}

export { PatientMedicationForm }
