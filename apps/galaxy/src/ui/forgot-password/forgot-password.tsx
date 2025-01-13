'use client'

import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { Flex, Heading, Text } from '@radix-ui/themes'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { z } from 'zod'
import { submitForgotPasswordAction } from '@/actions'
import { FormContainer, NavLogo } from '@/components'
import { EmailInput } from './email-input'
import { SubmitButton } from './submit-button'

const schema = z.object({
  email: z.string().trim().min(1, 'Email is required').email(),
})

type SchemaType = z.infer<typeof schema>

const ForgotPassword = () => {
  const router = useRouter()

  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    reValidateMode: 'onChange',
    defaultValues: {
      email: '',
    },
  })

  const onSubmit: SubmitHandler<SchemaType> = async (data) => {
    const response = await submitForgotPasswordAction({
      emailAddress: data.email.trim(),
    })

    if (response.state === 'error') {
      toast.error(response.error)
      return
    }

    toast.success(response.data.message)
    router.replace(`/change-password/${data.email}`)
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
          <Heading weight="medium" mb="2">
            Reset Password
          </Heading>
          <Text className="text-pp-dark-grey mb-5" size="2">
            Enter your email to reset your password.
          </Text>
          <FormContainer form={form} onSubmit={onSubmit}>
            <Flex direction="column" gap="4" mb="4" className="mb-5">
              <EmailInput />
            </Flex>
            <SubmitButton />
          </FormContainer>
        </Flex>
      </Flex>
    </Flex>
  )
}

export { ForgotPassword }
