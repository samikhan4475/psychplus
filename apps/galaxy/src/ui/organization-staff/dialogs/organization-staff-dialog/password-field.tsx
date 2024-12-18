'use client'

import { Button, Flex } from '@radix-ui/themes'
import { TextInput } from '@/components'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components/form'
import { ShuffelIcon } from '@/components/icons'

const PasswordField = () => {
  const onReset = () => {}

  return (
    <Flex className="gap-3">
      <FormFieldContainer className="flex-1 gap-0">
        <FormFieldLabel className="pb-[3px]" required>
          Password
        </FormFieldLabel>
        <TextInput field="password" className="h-6 w-full" />
        <FormFieldError name="password" />
      </FormFieldContainer>
      <Button
        color="gray"
        className="text-black mt-5"
        size="1"
        variant="outline"
        type="button"
        onClick={onReset}
      >
        <ShuffelIcon width={15} height={15} />
        Reset Password
      </Button>
    </Flex>
  )
}

export { PasswordField }
