'use client'

import { useEffect, useState } from 'react'
import { Flex } from '@radix-ui/themes'
import { type SubmitHandler } from 'react-hook-form'
import { z } from 'zod'
import { OTPDialog, type OTPSendStatus } from '@psychplus/auth/otp'
import {
  Form,
  FormSubmitButton,
  FormTextInput,
  useForm,
  validate,
} from '@psychplus/form'
import { SESSION_KEY_RESET_PASSWORD_EMAIL } from '@psychplus/utils/constants'
import { forgotPassword } from '../forgot-password/api'
import { changePassword } from './api'

const schema = z
  .object({
    emailAddress: validate.email,
    newPassword: validate.password,
    confirmPassword: validate.password,
  })
  .refine((values) => values.newPassword === values.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

type SchemaType = z.infer<typeof schema>

const ChangePasswordForm = () => {
  const [otpSendStatus, setOTPSendStatus] = useState<OTPSendStatus>('none')
  const [otpDialogOpen, setOTPDialogOpen] = useState(false)

  const form = useForm({
    schema,
    criteriaMode: 'all',
    defaultValues: {
      emailAddress: '',
      newPassword: '',
      confirmPassword: '',
    },
  })

  const onSubmit: SubmitHandler<SchemaType> = async () => {
    setOTPDialogOpen(true)
  }

  const submitWithOTP = (code: string) => {
    changePassword({
      emailAddress: form.getValues().emailAddress,
      newPassword: form.getValues().newPassword,
      confirmPassword: form.getValues().confirmPassword,
      resetCode: code,
    })
      .then(() => {
        sessionStorage.removeItem(SESSION_KEY_RESET_PASSWORD_EMAIL)
        location.assign('/login')
      })
      .catch((error) => alert(error.message))
  }

  const resendOTP = async () => {
    setOTPSendStatus('sending')

    forgotPassword({
      emailAddress: form.getValues().emailAddress,
    })
      .then(() => {
        setOTPSendStatus('sent')
      })
      .catch((error) => {
        setOTPSendStatus('error')
        alert(error.message)
      })
  }

  // Set the email address value in a useEffect because we are accessing
  // session storage, which is unavailable during server-side rendering.
  useEffect(() => {
    form.setValue(
      'emailAddress',
      sessionStorage.getItem(SESSION_KEY_RESET_PASSWORD_EMAIL) ?? '',
    )
  })

  return (
    <>
      <Form form={form} onSubmit={onSubmit}>
        <Flex direction="column" gap="4" mb="4">
          <FormTextInput
            type="password"
            label="New Password"
            placeholder="Choose a new password"
            data-testid="change-password-new-password-input"
            autoFocus
            {...form.register('newPassword')}
          />
          <FormTextInput
            type="password"
            label="Confirm Password"
            placeholder="Confirm your new password"
            data-testid="change-password-confirm-password-input"
            {...form.register('confirmPassword')}
          />
        </Flex>
        <FormSubmitButton data-testid="change-password-submit-button">
          Submit
        </FormSubmitButton>
      </Form>
      <OTPDialog
        email={form.getValues().emailAddress}
        isOpen={otpDialogOpen}
        setIsOpen={setOTPDialogOpen}
        onSubmit={submitWithOTP}
        onResend={resendOTP}
        sendStatus={otpSendStatus}
      />
    </>
  )
}

export { ChangePasswordForm }
