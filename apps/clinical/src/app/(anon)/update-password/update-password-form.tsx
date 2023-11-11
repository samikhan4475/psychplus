'use client'

import {
  Form,
  FormSubmitButton,
  FormTextInput,
  useForm,
  validate,
} from '@psychplus/form'
import { Flex } from '@radix-ui/themes'
import { type SubmitHandler } from 'react-hook-form'
import { z } from 'zod'

const schema = z
  .object({
    password: validate.password,
    confirmPassword: validate.password,
  })
  .refine((values) => values.password === values.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

type SchemaType = z.infer<typeof schema>

const UpdatePasswordForm = () => {
  const form = useForm({
    schema,
    criteriaMode: 'all',
  })

  const onSubmit: SubmitHandler<SchemaType> = async () => {
    await new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve()
      }, 1000)
    })
    location.assign('/login')
  }

  return (
    <Form form={form} onSubmit={onSubmit}>
      <Flex direction="column" gap="4" mb="4">
        <FormTextInput
          type="password"
          label="New Password"
          placeholder="Choose a new password"
          data-testid="update-password-password-input"
          {...form.register('password')}
        />
        <FormTextInput
          type="password"
          label="Confirm Password"
          placeholder="Confirm your new password"
          data-testid="update-password-confirm-input"
          {...form.register('confirmPassword')}
        />
      </Flex>
      <FormSubmitButton data-testid="update-password-submit-button">
        Submit
      </FormSubmitButton>
    </Form>
  )
}

export { UpdatePasswordForm }
