'use client'

import { AddressFieldsGroup } from '@/components'
import { FormFieldContainer, FormFieldLabel } from '@/components/form'

const AddressFields = () => {
  return (
    <FormFieldContainer className="flex-1 gap-0 pt-2">
      <FormFieldLabel className="text-[14px]">Primary Address</FormFieldLabel>
      <AddressFieldsGroup columnsPerRow="2" className="flex-row" />
    </FormFieldContainer>
  )
}

export { AddressFields }
