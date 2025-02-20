'use client'

import { useState } from 'react'
import NextLink from 'next/link'
import { useSearchParams } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { EnvelopeClosedIcon } from '@radix-ui/react-icons'
import { Flex, Heading, Text, TextField } from '@radix-ui/themes'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { z } from 'zod'
import { loginAction } from '@/actions'
import {
  FormContainer,
  FormError,
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
  FormSubmitButton,
  NavLogo,
  PasswordInput,
} from '@/components'
import { appendSearchParams } from '@/utils/params'

const LOGIN_FORM_EMAIL_INPUT = 'login-form-email-input'

const schema = z.object({
  username: z.string().trim().min(1, 'Email is required').email(),
  password: z.string().trim().min(1, 'Password is required'),
})

type SchemaType = z.infer<typeof schema>

const LoginPage = () => {
  const searchParams = useSearchParams()
  const [error, setError] = useState<string>()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    reValidateMode: 'onChange',
    defaultValues: {
      username: '',
      password: '',
    },
  })

  const onSubmit: SubmitHandler<SchemaType> = async (data) => {
    setError(undefined)
    setIsLoading(true)

    return loginAction({
      username: data.username.trim(),
      password: data.password.trim(),
      next:
        appendSearchParams(searchParams?.get('next'), searchParams, 'next') ??
        null,
    }).then((result) => {
      if (result?.state === 'error') {
        setIsLoading(false)
        setError(result.error)
      }
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
          justify="center"
          px="5"
          py="5"
          className="bg-white min-h-[300px] w-full max-w-[450px] rounded-3 shadow-3"
        >
          <Heading weight="medium" mb="4">
            Log in
          </Heading>
          <FormError message={error} />
          <FormContainer form={form} onSubmit={onSubmit}>
            <Flex direction="column" gap="4" mb="4">
              <FormFieldContainer>
                <FormFieldLabel id={LOGIN_FORM_EMAIL_INPUT}>
                  Email
                </FormFieldLabel>
                <TextField.Root
                  size="2"
                  placeholder="Email"
                  id={LOGIN_FORM_EMAIL_INPUT}
                  {...form.register('username')}
                  radius="full"
                >
                  <TextField.Slot>
                    <EnvelopeClosedIcon height="16" width="16" />
                  </TextField.Slot>
                </TextField.Root>
                <FormFieldError name="username" />
              </FormFieldContainer>
              <FormFieldContainer>
                <PasswordInput
                  field="password"
                  label="Password"
                  placeHolder="Password"
                />
                <Flex align="start">
                  <NextLink
                    href="/forgot-password"
                    prefetch={false}
                    className="ml-auto"
                  >
                    <Text className="text-[12px] text-accent-12 underline-offset-2 hover:underline">
                      Forgot password?
                    </Text>
                  </NextLink>
                </Flex>
              </FormFieldContainer>
            </Flex>
            <FormSubmitButton
              form={form}
              size="3"
              className="w-full"
              highContrast
              loading={isLoading}
              radius="full"
            >
              Log in
            </FormSubmitButton>
          </FormContainer>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default LoginPage
