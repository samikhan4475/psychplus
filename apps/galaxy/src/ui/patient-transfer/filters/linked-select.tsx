import React from 'react'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
  SelectInput,
} from '@/components'

import { useFormContext } from 'react-hook-form'
import { PatientTransferSchemaType } from '../pateint-transfer-filter-form'
import { BOOLEAN_OPTIONS } from '../constants'

const LinkedSelect = () => {
   const form = useFormContext<PatientTransferSchemaType>()
        const linked = form.watch('linked')
  return (
    <FormFieldContainer className=" flex-row items-center gap-2 ">
      <FormFieldLabel>Linked</FormFieldLabel>
      <SelectInput
        field="linked"
        options={BOOLEAN_OPTIONS}
        buttonClassName="h-6 w-full"
        placeholder="Select"
        defaultValue={linked}

        disabled={false}
      />
      <FormFieldError name="linked" />
    </FormFieldContainer>
  )
}

export { LinkedSelect }
