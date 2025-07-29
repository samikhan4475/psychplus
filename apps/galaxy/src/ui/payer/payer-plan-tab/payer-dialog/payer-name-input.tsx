'use client'

import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components/form'
import { Flex, Text, TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { PayerFormSchemaType } from './add-payer-form'

const MAX_LENGTH = 50

const PayerName = () => {
  const form = useFormContext<PayerFormSchemaType>()

  const payerName = form.watch("payername")
  const characterCount = payerName?.length || 0
  const isAtLimit = characterCount >= MAX_LENGTH

  return (
    <FormFieldContainer className="flex-1 gap-0">
      <Flex className="justify-between items-center" >
      <FormFieldLabel className="!text-1" required>
        Name
      </FormFieldLabel>
        <Text className={`text-[10px] ${isAtLimit ? 'text-red-10' : 'text-gray-500'}`}>
          {characterCount} / {MAX_LENGTH}
        </Text>
      </Flex>
      <TextField.Root size="1" {...form.register('payername')} placeholder='Payer Name' maxLength={MAX_LENGTH} />
      <FormFieldError name="payername" />
    </FormFieldContainer>
  )
}

export { PayerName }
