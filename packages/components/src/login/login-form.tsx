'use client'

import NextLink from 'next/link'
import { useSearchParams } from 'next/navigation'
import {
  Form,
  FormSubmitButton,
  FormTextInput,
  useForm,
  validate,
} from '@psychplus/form'
import { Flex, Link, Text } from '@radix-ui/themes'
import { type SubmitHandler } from 'react-hook-form'
import { z } from 'zod'
import * as api from '@psychplus/api/client'
import { Checkbox } from '@psychplus/ui/checkbox'

const schema = z.object({
  username: validate.email,
  password: validate.requiredString,
})

type SchemaType = z.infer<typeof schema>

const LoginForm = () => {
  const searchParams = useSearchParams()

  const form = useForm({
    schema,
    criteriaMode: 'all',
  })

  const onSubmit: SubmitHandler<SchemaType> = (data) => {
    api.login({ username: data.username, password: data.password }).then(() => {
      const next = searchParams.get('next') ?? '/'
      location.assign(next)
    })
  }

  return (
    <Form form={form} onSubmit={onSubmit}>
      <Flex direction="column" gap="4" mb="4">
        <FormTextInput
          type="text"
          label="Email"
          placeholder="Email"
          data-testid="login-username-input"
          {...form.register('username')}
        />
        <FormTextInput
          type="password"
          label="Password"
          placeholder="Password"
          data-testid="login-password-input"
          {...form.register('password')}
        />
      </Flex>
      <Flex align="center" justify="between" mb="4">
        <Text as="label" size="2">
          <Flex gap="2">
            <Checkbox defaultChecked data-testid="login-remember-me-checkbox" />
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
      <FormSubmitButton data-testid="login-submit-button">
        Sign in
      </FormSubmitButton>
    </Form>
  )
}

export { LoginForm }
