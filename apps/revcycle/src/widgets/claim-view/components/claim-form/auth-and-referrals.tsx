'use client'

import { Box, Flex, Text, TextArea } from '@radix-ui/themes'
import { UseFormReturn } from 'react-hook-form'
import { FormTextInput } from '@psychplus/form'
import { SchemaType } from './add-claim-form'

const AuthAndReferrals = ({ form }: { form: UseFormReturn<SchemaType> }) => {

  return (
    <>
      <Flex gap="3">
        <Box className="flex-1">
          <FormTextInput
            type="text"
            label="Authorization #"
            data-testid="authorization-number"
            {...form.register('authorizationNumber')}
          />
        </Box>
        <Box className="flex-1">
          <FormTextInput
            type="text"
            label="Referral #"
            data-testid="referral-number"
            {...form.register('referralNumber')}
          />
        </Box>
      </Flex>
      <Flex>
        <Box className="flex-1">
          <Text className="rt-Text rt-r-size-2 rt-r-weight-bold">
            Claim Notes
          </Text>
          <TextArea className="w-[100%]" {...form.register('claimNotes')} maxLength={2048}/>
        </Box>
      </Flex>
    </>
  )
}

export { AuthAndReferrals }
