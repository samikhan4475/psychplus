'use client'

import { Box, Flex, Text, TextArea } from '@radix-ui/themes'
import { UseFormReturn } from 'react-hook-form'
import { SchemaType } from './add-claim-form'
import TextFieldLabel from './text-field'

const AuthAndReferrals = ({ form }: { form: UseFormReturn<SchemaType> }) => {
  return (
    <>
      <Flex gap="3">
        <Box className="flex-1">
          <TextFieldLabel
            error={form.formState?.errors?.authorizationNumber?.message}
            type="text"
            label="Authorization #"
            register={form.register('authorizationNumber')}
          />
        </Box>
        <Box className="flex-1">
          <TextFieldLabel
            error={form.formState?.errors?.referralNumber?.message}
            type="text"
            label="Referral #"
            register={form.register('referralNumber')}
          />
        </Box>
      </Flex>
      <Flex>
        <Box className="flex-1">
          <Text>Claim Notes</Text>
          <TextArea className="w-[100%]" />
        </Box>
      </Flex>
    </>
  )
}

export { AuthAndReferrals }
