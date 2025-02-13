'use client'

import { Flex } from '@radix-ui/themes'
import {
  DropdownSelect,
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetCodes } from '@/hooks'

const CredentialSelect = () => {
  const PsychiatryServicesOffered = useCodesetCodes(CODESETS.ServicesOffered)
    .find((e) => e.value === 'Psychiatry')
    ?.attributes?.find((e) => e.name === 'ValidProviderHonors')
    ?.value.split(',')
    .map((e) => {
      return {
        value: e,
        label: e,
      }
    })

  return (
    <Flex className="col-span-1">
      <FormFieldContainer className="w-full">
        <FormFieldLabel>Credentials</FormFieldLabel>
        <DropdownSelect
          field="credentials"
          options={PsychiatryServicesOffered || []}
          placeholder="Select"
        />
        <FormFieldError name="credentials" />
      </FormFieldContainer>
    </Flex>
  )
}

export { CredentialSelect }
