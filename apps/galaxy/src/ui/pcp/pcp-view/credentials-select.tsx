'use client'

import { Flex } from '@radix-ui/themes'
import { CodesetSelect, FormFieldContainer, FormFieldLabel } from '@/components'
import { CODESETS } from '@/constants'

const CredentialSelect = () => {
  return (
    <Flex className="col-span-1">
      <FormFieldContainer className="w-full">
        <FormFieldLabel>Credentials</FormFieldLabel>
        <CodesetSelect
          name="physicianCredentials"
          codeset={CODESETS.PractitionerHonor}
          size="1"
        />
      </FormFieldContainer>
    </Flex>
  )
}

export { CredentialSelect }
