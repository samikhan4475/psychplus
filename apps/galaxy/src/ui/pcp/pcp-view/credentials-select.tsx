'use client'

import { Flex } from '@radix-ui/themes'
import {
  CodesetSelect,
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components'
import { CODESETS } from '@/constants'

const CredentialSelect = () => {
  return (
    <Flex className="col-span-1">
      <FormFieldContainer className="w-full">
        <FormFieldLabel required>Credentials</FormFieldLabel>
        <CodesetSelect
          name="credentials"
          codeset={CODESETS.PractitionerHonor}
          size="1"
        />
        <FormFieldError name="credentials" />
      </FormFieldContainer>
    </Flex>
  )
}

export { CredentialSelect }
