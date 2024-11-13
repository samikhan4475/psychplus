import React from 'react'
import { getPOSCodesOptions } from '@/actions/get-poscodes'
import {
  AsyncSelect,
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components'

const PosSelectField = () => {
  return (
    <FormFieldContainer className="w-auto">
      <FormFieldLabel required>POS</FormFieldLabel>
      <AsyncSelect
        field="placeOfService"
        placeholder="Select"
        fetchOptions={getPOSCodesOptions}
        size="1"
        buttonClassName="w-full"
      />
      <FormFieldError name="placeOfService" />
    </FormFieldContainer>
  )
}

export { PosSelectField }
