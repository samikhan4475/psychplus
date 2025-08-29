'use client'

import { Flex, Text, TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components/form'

type EditPayerFormSchemaType = {
  payerId: string
  payerName: string
  recordStatus: string
}

const MAX_LENGTH = 50

const EditPayerName = () => {
  const form = useFormContext<EditPayerFormSchemaType>()

  const payerName = form.watch('payerName')
  const characterCount = payerName?.length || 0
  const isAtLimit = characterCount >= MAX_LENGTH

  return (
    <FormFieldContainer className="flex-1 gap-0">
      <Flex className="items-center justify-between">
        <FormFieldLabel className="!text-1" required>
          Payer Name
        </FormFieldLabel>
        <Text
          className={`text-[10px] ${
            isAtLimit ? 'text-red-10' : 'text-gray-500'
          }`}
        >
          {characterCount} / {MAX_LENGTH}
        </Text>
      </Flex>
      <TextField.Root
        size="1"
        {...form.register('payerName')}
        placeholder="Enter payer name"
        maxLength={MAX_LENGTH}
      />
      <FormFieldError name="payerName" />
    </FormFieldContainer>
  )
}

export { EditPayerName }
