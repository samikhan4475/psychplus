import React from 'react'
import { Flex, Text } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { FormFieldLabel } from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetCodes } from '@/hooks'
import { PaymentListTypes } from '../types'
import { SchemaType } from './schema'

const ClaimStatus = () => {
  const form = useFormContext<SchemaType>()
  const status = form.getValues('status')
  const paymentStatusCode = useCodesetCodes(CODESETS.PaymentPostingStatus).find(
    (value) => value.value === status,
  )?.display

  return (
    <Flex align="center">
      <FormFieldLabel className="!text-1">Status:</FormFieldLabel>
      <Text
        size="1"
        className={`ml-1 mt-auto ${
          status === PaymentListTypes.Posted
            ? 'font-bold text-green-9'
            : 'font-medium'
        } `}
      >
        {paymentStatusCode}
      </Text>
    </Flex>
  )
}

export { ClaimStatus }
