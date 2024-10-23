'use client'

import { getPOSCodesOptions } from '@/actions/get-poscodes'
import { AsyncSelect, FormFieldContainer, FormFieldLabel } from '@/components'

const POSCodesSelect = () => {
  return (
    <FormFieldContainer>
      <FormFieldLabel required={true}>POS</FormFieldLabel>
      <AsyncSelect
        field="placeOfService"
        placeholder="Select"
        fetchOptions={getPOSCodesOptions}
        buttonClassName="w-full h-6"
        className="h-full flex-1"
      />
    </FormFieldContainer>
  )
}

export { POSCodesSelect }
