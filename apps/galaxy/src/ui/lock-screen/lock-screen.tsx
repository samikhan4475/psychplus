'use client'

import { useParams, useSearchParams } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { Flex, Heading, Text } from '@radix-ui/themes'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { z } from 'zod'
import { loginAction } from '@/actions'
import {
  FormContainer,
  FormSubmitButton,
  NavLogo,
  PasswordInput,
} from '@/components'
import { WaitingTimeoutIcon } from '@/components/icons'
import { decodeUrlString } from '@/utils'

const schema = z.object({
  username: z.string().trim().min(1, 'Email is required').email(),
  password: z.string().trim().min(1, 'Password is required'),
})

type SchemaType = z.infer<typeof schema>

const LockScreen = () => {
  const searchParams = useSearchParams()
  const { email } = useParams<{ email: string }>()

  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    reValidateMode: 'onChange',
    defaultValues: {
      username: decodeUrlString(email),
      password: '',
    },
  })

  const onSubmit: SubmitHandler<SchemaType> = async (data) => {
    return loginAction({
      username: data.username.trim(),
      password: data.password.trim(),
      next: searchParams?.get('next') ?? null,
    }).then((result) => {
      if (result?.state === 'error') {
        toast.error(result.error)
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
          px="5"
          py="5"
          className="bg-white w-full max-w-[450px] rounded-3 shadow-3"
        >
          <Flex justify="center" className="mb-5">
            <WaitingTimeoutIcon />
          </Flex>
          <Heading weight="medium" mb="2" className="text-center">
            Session Expired
          </Heading>
          <Text className="text-pp-dark-grey mb-5 text-center" size="2">
            Enter the password to continue work.
          </Text>
          <FormContainer form={form} onSubmit={onSubmit}>
            <Flex direction="column" gap="4" mb="4" className="mb-5">
              <PasswordInput label="Password" field="password" autoFocus />
            </Flex>
            <FormSubmitButton
              form={form}
              size="3"
              className="w-full"
              highContrast
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

export { LockScreen }
