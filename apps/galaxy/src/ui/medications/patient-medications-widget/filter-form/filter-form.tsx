'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Flex } from '@radix-ui/themes'
import { SubmitHandler, useForm } from 'react-hook-form'
import { FormContainer } from '@/components'
import { useStore } from '../store'
import { transformOutFilterValues } from '../transform'
import { ClearButton } from './clear-button'
import { EndDateField } from './end-date-field'
import { NameField } from './name-field'
import { PharmacySelect } from './pharmacy-select'
import { PrescribedStatus } from './prescribed-status'
import { PrescriberSelect } from './prescriber-select'
import { PatientMedicationFilterSchemaType, schema } from './schema'
import { SubmitButton } from './submit-button'
import { WrittenDateField } from './written-date-field'

interface FilterFormProps {
  patientId: string
}

const FilterForm = ({ patientId }: FilterFormProps) => {
  const { fetchPatientMedication } = useStore((state) => ({
    fetchPatientMedication: state.fetchPatientMedication,
  }))

  const form = useForm<PatientMedicationFilterSchemaType>({
    resolver: zodResolver(schema),
    defaultValues: {
      writtenDate: undefined,
      endDate: undefined,
      drugName: '',
      medicationStatuses: '',
      recordStatuses: '',
      pharmacyNcpdpId: '',
      patientIds: [Number(patientId)],
      prescribingStaffId: '',
    },
  })
  const onSubmit: SubmitHandler<PatientMedicationFilterSchemaType> = (data) => {
    const payload = transformOutFilterValues(data)
    return fetchPatientMedication(payload, 1, true)
  }
  return (
    <FormContainer
      className="bg-white flex flex-grow-0 flex-row flex-wrap items-center gap-2 p-2"
      form={form}
      onSubmit={onSubmit}
      formClassName="flex-grow-0"
    >
      <WrittenDateField />
      <EndDateField />
      <NameField />
      <PrescriberSelect />
      <PharmacySelect patientId={patientId} />
      <PrescribedStatus />
      <Flex gap="2" align="center">
        <ClearButton patientId={patientId} />
        <SubmitButton />
      </Flex>
    </FormContainer>
  )
}

export { FilterForm }
