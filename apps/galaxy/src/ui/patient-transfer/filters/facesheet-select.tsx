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

const FaceSheetSelect = () => {
  const form = useFormContext<PatientTransferSchemaType>()
  const facesheet = form.watch('legal')
  return (
    <FormFieldContainer className=" flex-row items-center gap-2 ">
      <FormFieldLabel>FaceSheet</FormFieldLabel>
      <SelectInput
        field="facesheet"
        options={BOOLEAN_OPTIONS}
        buttonClassName="h-6 w-full"
        defaultValue={facesheet}
        placeholder="Select"
        disabled={false}
      />
      <FormFieldError name="facesheet" />
    </FormFieldContainer>
  )
}

export { FaceSheetSelect }
