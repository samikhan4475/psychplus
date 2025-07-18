import React from 'react'
import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
  SelectInput,
} from '@/components'
import { PatientTransferSchemaType } from '../pateint-transfer-filter-form'
import { BOOLEAN_OPTIONS } from '../constants'


const DocumentsSelect = () => {
  const form = useFormContext<PatientTransferSchemaType>()
  const documents = form.watch('documents')
  return (
    <FormFieldContainer className=" flex-row items-center gap-2 ">
      <FormFieldLabel>Documents</FormFieldLabel>
      <SelectInput
        field="documents"
        options={BOOLEAN_OPTIONS}
        buttonClassName="h-6 w-full"
        defaultValue={documents}
        placeholder="Select"
        disabled={false}
      />
      <FormFieldError name="documents" />
    </FormFieldContainer>
  )
}

export { DocumentsSelect }
