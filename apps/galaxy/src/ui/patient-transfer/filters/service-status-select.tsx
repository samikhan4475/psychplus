'use client'

import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldLabel,
  MultiSelectField,
} from '@/components'
import { SERVICE_STATUS_OPTIONS } from '../constants'
import { PatientTransferSchemaType } from '../pateint-transfer-filter-form'

const ServiceMultiSelect = () => {
  const form = useFormContext<PatientTransferSchemaType>()
  const services = form.watch('serviceStatus')

  return (
    <FormFieldContainer className="flex-row items-center gap-1">
      <FormFieldLabel>Service</FormFieldLabel>
      <MultiSelectField
        disabled={false}
        defaultValues={services}
        options={SERVICE_STATUS_OPTIONS}
        className="flex-1"
        onChange={(values) => form.setValue('serviceStatus', values)}
        menuClassName="w-[155px]"
        loading={false}
      />
    </FormFieldContainer>
  )
}

export { ServiceMultiSelect }
