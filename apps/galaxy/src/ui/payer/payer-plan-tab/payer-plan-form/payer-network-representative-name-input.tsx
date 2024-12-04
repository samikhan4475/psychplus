'use client'

import { TextInput } from '@/components'
import { FormFieldContainer, FormFieldLabel } from '@/components/form'

const PayerNetworkRepresentativeName = () => {
  return (
    <FormFieldContainer className="flex-1 gap-0">
      <FormFieldLabel className="!text-1">Payer Network Representative Name</FormFieldLabel>
      <TextInput field="networkRepresentativeName"  className="w-full" placeHolder='Representative Name'/>
    </FormFieldContainer>
  )
}

export { PayerNetworkRepresentativeName }
