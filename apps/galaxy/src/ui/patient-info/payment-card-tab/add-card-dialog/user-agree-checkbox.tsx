'use client'

import { Checkbox, Flex, Text } from '@radix-ui/themes'
import { Controller, useFormContext } from 'react-hook-form'
import { FormFieldError } from '@/components'

const UserAgreeCheckbox = () => {
  const form = useFormContext()
  return (
    <Text as="label" size="1">
      <Flex className="mt-1 gap-1.5">
        <Controller
          name={'userAgreed'}
          control={form.control}
          render={({ field }) => {
            const { ref, ...rest } = field

            return (
              <Checkbox
                onCheckedChange={field.onChange}
                size={'1'}
                id={'userAgreed'}
                {...rest}
                highContrast
              />
            )
          }}
        />
        I have read the terms & conditions and card holder has agreed to place
        the card on file
      </Flex>
      <FormFieldError name="userAgreed" />
    </Text>
  )
}

export default UserAgreeCheckbox
