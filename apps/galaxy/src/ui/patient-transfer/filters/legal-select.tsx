import React from 'react'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
  SelectInput,
} from '@/components'
import { useFormContext } from 'react-hook-form'
import { PatientTransferSchemaType } from '../pateint-transfer-filter-form'


const LegalSelect = () => {

     const form = useFormContext<PatientTransferSchemaType>()
      const legal = form.watch('legal')
  return (
    <FormFieldContainer className=" flex-row items-center gap-2 ">
      <FormFieldLabel>Legal</FormFieldLabel>
      <SelectInput
        field="legal"
        defaultValue={legal}
        placeholder="Select"
        options={[]}
        buttonClassName="h-6 w-full"
        disabled={false}
      />
      <FormFieldError name="legal" />
    </FormFieldContainer>
  )
}

export { LegalSelect }
