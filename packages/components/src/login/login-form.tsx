'use client'

import NextLink from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Flex, Link, Text } from '@radix-ui/themes'
import { useForm, type SubmitHandler } from 'react-hook-form'
import * as api from '@psychplus/api/client'
import { Button } from '@psychplus/ui/button'
import { Checkbox } from '@psychplus/ui/checkbox'
import { PasswordInput } from './password-input'
import { UsernameInput } from './username-input'

interface LoginFormValues {
  username: string
  password: string
}

const LoginForm = () => {
  const searchParams = useSearchParams()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    criteriaMode: 'all',
  })

  const onSubmit: SubmitHandler<LoginFormValues> = (data) => {
    api.login({ username: data.username, password: data.password }).then(() => {
      const next = searchParams.get('next') ?? '/'
      location.assign(next)
    })
  }

  return (
    <Flex direction="column" gap="4" asChild>
      <form onSubmit={handleSubmit(onSubmit)}>
        <UsernameInput register={register} errors={errors} />
        <PasswordInput register={register} errors={errors} />
        <Flex align="center" justify="between">
          <Text as="label" size="2">
            <Flex gap="2">
              <Checkbox defaultChecked /> Remember me
            </Flex>
          </Text>
          <Link size="2" asChild>
            <NextLink href="/forgot-password">Forgot Password?</NextLink>
          </Link>
        </Flex>
        <Button type="submit" size="3" data-testid="login-button">
          Sign in
        </Button>
      </form>
    </Flex>
  )
}

export { LoginForm, type LoginFormValues }
