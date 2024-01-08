'use client'

import { unstable_noStore as noStore } from 'next/cache'
import { useSearchParams } from 'next/navigation'
import { Flex, Link, Text } from '@radix-ui/themes'
import { type SubmitHandler } from 'react-hook-form'
import { z } from 'zod'
import {
  Form,
  FormSubmitButton,
  FormTextInput,
  useForm,
  validate,
} from '@psychplus/form'
import { AppLink } from '@psychplus/ui/app-link'
import { Checkbox } from '@psychplus/ui/checkbox'
import { wrapPath } from '@psychplus/utils/url'
import { login } from './api'

const schema = z.object({
  username: validate.email,
  password: validate.requiredString,
})

type SchemaType = z.infer<typeof schema>

const LoginForm = () => {
  noStore()

  const searchParams = useSearchParams()

  const form = useForm({
    schema,
    criteriaMode: 'all',
    defaultValues: {
      username: '',
      password: '',
    },
  })

  const onSubmit: SubmitHandler<SchemaType> = (data) => {
    login({
      username: data.username,
      password: data.password,
    })
      .then(() => {
        const next = searchParams.get('next') ?? `/`
        location.assign(wrapPath(next))
      })
      .catch((error) => {
        alert(error.message)
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
          autoFocus
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
          <AppLink
            href="/forgot-password"
            data-testid="login-forgot-password-link"
          >
            Forgot password?
          </AppLink>
        </Link>
      </Flex>
      <FormSubmitButton data-testid="login-submit-button">
        Sign in
      </FormSubmitButton>
    </Form>
  )
}

export { LoginForm }
