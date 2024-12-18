'use client'

import { AddressFieldsGroup } from '@/components'
import { FormFieldContainer, FormFieldLabel } from '@/components/form'

const AddressFields = () => {
  return (
    <FormFieldContainer className="flex-1 gap-0 pt-2">
      <FormFieldLabel className="pb-2 text-[14px]">Home Address</FormFieldLabel>
      <AddressFieldsGroup columnsPerRow="2" className="flex" required />
    </FormFieldContainer>
  )
}

export { AddressFields }
