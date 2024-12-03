'use client'

import { FormFieldContainer, FormFieldLabel, TextInput } from '@/components'

const PharmacyNameSelect = () => {
  return (
    <FormFieldContainer className="flex-row items-center gap-1">
      <FormFieldLabel>Name</FormFieldLabel>
      <TextInput field="drugName" className="w-full" />
    </FormFieldContainer>
  )
}
export { PharmacyNameSelect }
