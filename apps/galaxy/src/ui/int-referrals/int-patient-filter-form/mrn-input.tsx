'use client'

import { Flex, TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components'
import { IntReferralsPatientLookUpSchemaType } from './schema'

const MRNInput = () => {
  const form = useFormContext<IntReferralsPatientLookUpSchemaType>()
  return (
    <FormFieldContainer className="gap-1">
      <Flex gap="1">
        <FormFieldLabel className="!text-1">MRN</FormFieldLabel>
        <TextField.Root
          size="1"
          placeholder="MRN"
          className="border-pp-gray-2 h-6 w-full border border-solid !outline-none [box-shadow:none]"
          {...form.register('mrn')}
        />
      </Flex>
      <FormFieldError name="mrn" />
    </FormFieldContainer>
  )
}

export { MRNInput }
