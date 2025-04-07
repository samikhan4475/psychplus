'use client'

import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { Flex, Heading, Text } from '@radix-ui/themes'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { changePasswordAction } from '@/actions'
import { FormContainer, FormError, NavLogo, PasswordInput } from '@/components'
import { decodeUrlString } from '@/utils'
import { CodeInput } from './code-input'
import { Footer } from './footer'
import { ResendButton } from './resend-button'
import { schema, type SchemaType } from './schema'
import { SubmitButton } from './submit-button'
import { ValidationItem } from './validate-item'

const ChangePassword = () => {
  const [passwordValidationErrors, setPasswordValidationErrors] = useState<
    Record<string, boolean>
  >({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    specialChar: false,
    match: false,
  })
  const router = useRouter()
  const { email } = useParams<{ email: string }>()
  const [error, setError] = useState<string>()

  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    reValidateMode: 'onChange',
    defaultValues: {
      resetCode: '',
      newPassword: '',
      confirmPassword: '',
    },
  })

  const onSubmit: SubmitHandler<SchemaType> = async (data) => {
    setError(undefined)

    const response = await changePasswordAction({
      emailAddress: decodeUrlString(email),
      resetCode: data.resetCode.trim(),
      newPassword: data.newPassword.trim(),
      confirmPassword: data.confirmPassword.trim(),
    })

    if (response?.state === 'error') {
      setError(response.error)
      toast.error(response.error)
      return
    }

    toast.success('Password changed successfully!')
    form.reset()
    router.replace('/login')
  }

  const updateValidationErrors = () => {
    const newPassword = form.getValues('newPassword')
    const confirmPassword = form.getValues('confirmPassword')
    setPasswordValidationErrors({
      length: newPassword.length >= 8,
      uppercase: /[A-Z]/.test(newPassword),
      lowercase: /[a-z]/.test(newPassword),
      number: /\d/.test(newPassword),
      specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(newPassword),
      match: newPassword === confirmPassword,
    })
  }

  return (
    <Flex direction="column" height="100%">
      <Flex
        justify={{ initial: 'start', sm: 'center' }}
        px="5"
        py="1"
        className="border-b border-b-gray-5"
      >
        <NavLogo />
      </Flex>
      <Flex
        direction="column"
        justify="center"
        align="center"
        px="5"
        className="flex-1 bg-gray-3"
      >
        <Flex
          direction="column"
          px="5"
          py="5"
          className="bg-white w-full max-w-[450px] rounded-3 shadow-3"
        >
          <Heading weight="medium" mb="4">
            Forgot Password
          </Heading>
          <Flex className="mb-4">
            <Text className="text-pp-dark-grey" size="2">
              Enter the code that was sent to {decodeUrlString(email)}.
            </Text>
          </Flex>
          <Flex className="mb-4">
            <Text size="2">
              Didn&#39;t receive the code?{' '}
              <ResendButton email={decodeUrlString(email)} />
            </Text>
          </Flex>
          <FormError message={error} />
          <FormContainer form={form} onSubmit={onSubmit}>
            <Flex direction="column" gap="4" mb="4">
              <CodeInput />
              <PasswordInput
                label="New Password"
                field="newPassword"
                onchange={updateValidationErrors}
                required
              />
              <PasswordInput
                label="Confirm Password"
                field="confirmPassword"
                onchange={updateValidationErrors}
                required
              />
            </Flex>
            <Flex direction="column" gap="2" className="mb-4">
              <ValidationItem
                isValid={passwordValidationErrors.length}
                label="8 characters minimum"
              />
              <ValidationItem
                isValid={passwordValidationErrors.uppercase}
                label="One uppercase letter"
              />
              <ValidationItem
                isValid={passwordValidationErrors.lowercase}
                label="One lowercase letter"
              />
              <ValidationItem
                isValid={passwordValidationErrors.number}
                label="One number"
              />
              <ValidationItem
                isValid={passwordValidationErrors.specialChar}
                label="One special character (e.g., !, @, #, $)"
              />
              <ValidationItem
                isValid={passwordValidationErrors.match}
                label="Your new & confirmation passwords must match"
              />
            </Flex>
            <SubmitButton />
          </FormContainer>

          <Footer />
        </Flex>
      </Flex>
    </Flex>
  )
}

export { ChangePassword }
