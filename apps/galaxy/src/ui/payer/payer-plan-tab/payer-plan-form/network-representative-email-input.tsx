'use client'

import { TextInput } from '@/components'
import { FormFieldContainer, FormFieldLabel } from '@/components/form'

const NetworkRepresentativeEmail = () => {
  return (
    <FormFieldContainer className="flex-1 gap-0">
      <FormFieldLabel className="!text-1">
        Network Representative Email
      </FormFieldLabel>
      <TextInput
        field="networkRepresentativeEmail"
        className="w-full"
      />
    </FormFieldContainer>
  )
}

export { NetworkRepresentativeEmail }
