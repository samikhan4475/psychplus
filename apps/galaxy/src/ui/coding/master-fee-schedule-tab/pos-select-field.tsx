import React from 'react'
import { getPOSCodesOptions } from '@/actions/get-poscodes'
import { AsyncSelect, FormFieldContainer, FormFieldLabel } from '@/components'

const PosSelectField = () => {
  return (
    <FormFieldContainer className="w-auto flex-row items-center gap-1">
      <FormFieldLabel>POS</FormFieldLabel>
      <AsyncSelect
        field="placeOfService"
        placeholder="Select"
        fetchOptions={getPOSCodesOptions}
        size="1"
        buttonClassName="w-[101px]"
      />
    </FormFieldContainer>
  )
}

export { PosSelectField }
