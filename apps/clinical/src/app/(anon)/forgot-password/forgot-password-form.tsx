'use client'

import { Flex } from '@radix-ui/themes'
import { type SubmitHandler } from 'react-hook-form'
import { z } from 'zod'
import {
  Form,
  FormSubmitButton,
  FormTextInput,
  useForm,
  validate,
} from '@psychplus/form'
import { forgotPassword } from './api'

const schema = z.object({
  emailAddress: validate.email,
})

type SchemaType = z.infer<typeof schema>

const ForgotPasswordForm = () => {
  const form = useForm({
    schema,
    criteriaMode: 'all',
    defaultValues: {
      emailAddress: '',
    },
  })

  const onSubmit: SubmitHandler<SchemaType> = async (data) => {
    forgotPassword({
      emailAddress: data.emailAddress,
    })
      .then(() => {
        sessionStorage.setItem('reset-password-email', data.emailAddress)
        location.assign('/change-password')
      })
      .catch((error) => alert(error.message))
  }

  return (
    <Form form={form} onSubmit={onSubmit}>
      <Flex direction="column" gap="4" mb="4">
        <FormTextInput
          type="text"
          label="Email"
          placeholder="Enter your email address"
          data-testid="forgot-password-email-input"
          autoFocus
          {...form.register('emailAddress')}
        />
        <FormSubmitButton data-testid="forgot-password-submit-button">
          Submit
        </FormSubmitButton>
      </Flex>
    </Form>
  )
}

export { ForgotPasswordForm }
