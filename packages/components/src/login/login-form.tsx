'use client'

import NextLink from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Flex, Link, Text } from '@radix-ui/themes'
import { useForm, type SubmitHandler } from 'react-hook-form'
import * as api from '@psychplus/api/client'
import { Button } from '@psychplus/ui/button'
import { Checkbox } from '@psychplus/ui/checkbox'
import { FormTextInput } from '@/form'

interface LoginFormFields {
  username: string
  password: string
}

const LoginForm = () => {
  const searchParams = useSearchParams()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormFields>({
    criteriaMode: 'all',
  })

  const onSubmit: SubmitHandler<LoginFormFields> = (data) => {
    api.login({ username: data.username, password: data.password }).then(() => {
      const next = searchParams.get('next') ?? '/'
      location.assign(next)
    })
  }

  return (
    <Flex direction="column" gap="4" asChild>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormTextInput
          name="username"
          type="email"
          register={register}
          errors={errors}
          placeholder="Email"
          data-testid="login-username-input"
        />
        <FormTextInput
          name="password"
          type="password"
          register={register}
          errors={errors}
          placeholder="Password"
          data-testid="login-password-input"
        />
        <Flex align="center" justify="between">
          <Text as="label" size="2">
            <Flex gap="2">
              <Checkbox
                defaultChecked
                data-testid="login-remember-me-checkbox"
              />
              Remember me
            </Flex>
          </Text>
          <Link size="2" asChild>
            <NextLink
              href="/forgot-password"
              data-testid="login-forgot-password-link"
            >
              Forgot password?
            </NextLink>
          </Link>
        </Flex>
        <Button type="submit" size="3" data-testid="login-button">
          Sign in
        </Button>
      </form>
    </Flex>
  )
}

export { LoginForm }
