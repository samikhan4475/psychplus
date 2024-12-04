'use client'

import { TextInput } from '@/components'
import { FormFieldContainer, FormFieldLabel } from '@/components/form'

const ProviderProtalURL = () => {
  return (
    <FormFieldContainer className="flex-1 gap-0">
      <FormFieldLabel className="!text-1">Provider Portal URL</FormFieldLabel>
      <TextInput field="providerPortalUrl" className="w-full" placeHolder='https://xyz.com'/>
    </FormFieldContainer>
  )
}

export { ProviderProtalURL }
