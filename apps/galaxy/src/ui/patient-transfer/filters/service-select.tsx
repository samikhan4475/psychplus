'use client'

import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
  MultiSelectField,
} from '@/components'
import { PatientTransferSchemaType } from '../pateint-transfer-filter-form'


const ServiceDropdown = () => {
  const form = useFormContext<PatientTransferSchemaType>()
  const services: string[] = []

  return (
    <FormFieldContainer className="flex-row items-center gap-2">
      <FormFieldLabel>Service</FormFieldLabel>

      <MultiSelectField
        disabled={false}
        defaultValues={services}
        options={[]}
        className="flex-1"
        onChange={(values) => form.setValue('service', values)}
        menuClassName="w-[155px]"
        loading={false}
      />
      <FormFieldError name={'service'} />
    </FormFieldContainer>
  )
}

export { ServiceDropdown }
