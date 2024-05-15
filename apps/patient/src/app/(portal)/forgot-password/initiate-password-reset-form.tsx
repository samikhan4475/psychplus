import { useState } from 'react'
import NextLink from 'next/link'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormContainer } from '@psychplus-v2/components'
import { Flex, Heading, Text, TextFieldInput } from '@radix-ui/themes'
import { useForm, type SubmitHandler } from 'react-hook-form'
import z from 'zod'
import { FormError, FormField, FormSubmitButton } from '@/components-v2'
import { startForgotPasswordAction } from './start-forgot-password'

const schema = z.object({
  email: z.string().min(1, 'Required').email('Invalid email'),
})

type SchemaType = z.infer<typeof schema>

interface InitiatePasswordResetFormProps {
  onSuccess: (email: string) => void
}

const InitiatePasswordResetForm = ({
  onSuccess,
}: InitiatePasswordResetFormProps) => {
  const [error, setError] = useState<string>()

  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    reValidateMode: 'onChange',
    defaultValues: {
      email: '',
    },
  })

  const onSubmit: SubmitHandler<SchemaType> = async (data) => {
    setError(undefined)

    const result = await startForgotPasswordAction({ emailAddress: data.email })
    if (result.state === 'error') {
      setError(result.error)
      return
    }

    onSuccess(data.email)
  }

  return (
    <Flex
      direction="column"
      className="bg-white w-full max-w-[500px] rounded-3 p-12 shadow-3"
    >
      <Flex direction="column" gap="2" mb="4">
        <Heading weight="medium" className="text-[36px] text-accent-12">
          Forgot Password
        </Heading>
        <Text className="text-gray-11">
          Enter the email you used to create your account.
        </Text>
      </Flex>
      <FormError message={error} />
      <FormContainer form={form} onSubmit={onSubmit}>
        <FormField name="email" label="Email">
          <TextFieldInput size="3" {...form.register('email')} />
        </FormField>
        <FormSubmitButton size="4" className="mt-4">
          Submit
        </FormSubmitButton>
      </FormContainer>

      <Text align="center" className="mt-8 text-[15px]">
        Trying to log in?
        <NextLink
          href="/login"
          className="ml-1 text-accent-11 underline-offset-2 transition-colors hover:text-accent-12 hover:underline"
        >
          Go to log in
        </NextLink>
      </Text>
    </Flex>
  )
}

export { InitiatePasswordResetForm }
