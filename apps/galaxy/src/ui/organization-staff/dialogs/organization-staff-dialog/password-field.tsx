'use client'

import { Button, Flex, TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components/form'
import { ShuffelIcon } from '@/components/icons'
import { SchemaType } from './schema'

const PasswordField = () => {
  const form = useFormContext<SchemaType>()
  return (
    <Flex className="gap-3">
      <FormFieldContainer className="flex-1 gap-0">
        <FormFieldLabel className="pb-[3px]" required>
          Password
        </FormFieldLabel>
        <TextField.Root
          size="1"
          className="border-pp-gray-2 h-6 w-full border border-solid !outline-none [box-shadow:none]"
          {...form.register('password')}
          type="password"
        />
        <FormFieldError name="password" />
      </FormFieldContainer>
      <Button
        color="gray"
        className="text-black mt-5"
        size="1"
        variant="outline"
        type="button"
        disabled
      >
        <ShuffelIcon width={15} height={15} />
        Reset Password
      </Button>
    </Flex>
  )
}

export { PasswordField }
