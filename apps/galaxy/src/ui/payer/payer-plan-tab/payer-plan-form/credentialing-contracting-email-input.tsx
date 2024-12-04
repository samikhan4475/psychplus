'use client'

import { TextInput } from '@/components'
import { FormFieldContainer, FormFieldError, FormFieldLabel } from '@/components/form'

const CredentialingContractingEmail = () => {
  return (
    <FormFieldContainer className="flex-1 gap-0">
      <FormFieldLabel className="!text-1">
        Credentialing/Contracting Email
      </FormFieldLabel>
      <TextInput field="credentialOrContractingEmail" className="w-full" placeHolder='Contracting Email'/>
      <FormFieldError name="credentialOrContractingEmail" />

    </FormFieldContainer>
  )
}

export { CredentialingContractingEmail }
