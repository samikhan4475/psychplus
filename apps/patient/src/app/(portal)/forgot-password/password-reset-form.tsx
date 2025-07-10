import { useState } from 'react'
import NextLink from 'next/link'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormContainer } from '@psychplus-v2/components'
import { cn } from '@psychplus-v2/utils'
import { Flex, Heading, Text } from '@radix-ui/themes'
import { CheckIcon, Loader2Icon, XIcon } from 'lucide-react'
import { useForm, type SubmitHandler } from 'react-hook-form'
import z from 'zod'
import {
  CodeInput,
  FormError,
  FormField,
  FormSubmitButton,
  PasswordInput,
  PasswordRequirements,
} from '@/components-v2'
import { useValidateNewPassword } from '@/hooks'
import { useToast } from '@/providers'
import { resetPasswordAction } from './reset-password'
import { startForgotPasswordAction } from './start-forgot-password'
import { ConfigurationResponse } from '@psychplus-v2/types'

const schema = z.object({
  email: z.string().min(1, 'Required').email('Invalid email'),
  resetCode: z.string().min(1, 'Required').length(5, 'Invalid code'),
  newPassword: z
    .string()
    .min(1, 'Required')
    .min(8, 'Password must be at least 8 characters'),
  confirmPassword: z
    .string()
    .min(1, 'Required')
    .min(8, 'Password must be at least 8 characters'),
})

type SchemaType = z.infer<typeof schema>

interface PasswordResetFormProps {
  email: string
  reset: string | null
  configuration: ConfigurationResponse
}

type CodeSendStatus = 'success' | 'error' | 'idle' | 'sending'

const PasswordResetForm = ({ email, reset, configuration }: PasswordResetFormProps) => {
  const { toast } = useToast()
  const router = useRouter()
  const [resendStatus, setResendStatus] = useState<CodeSendStatus>('idle')
  const [error, setError] = useState<string>()

  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    reValidateMode: 'onChange',
    defaultValues: {
      email,
      newPassword: '',
      confirmPassword: '',
      resetCode: '',
    },
  })

  const { isValid } = useValidateNewPassword({
    newPassword: form.watch('newPassword'),
    confirmPassword: form.watch('confirmPassword'),
  })

  const onSubmit: SubmitHandler<SchemaType> = async (data) => {
    setError(undefined)

    const result = await resetPasswordAction({
      ...data,
      emailAddress: data.email,
    })

    if (result.state === 'error') {
      setError(result.error)
      return
    }

    toast({
      title: 'Password reset successfully',
      type: 'success',
    })

    router.replace('/login')
  }

  const resendCode = () => {
    setResendStatus('sending')

    startForgotPasswordAction({ emailAddress: email })
      .then(() => {
        setResendStatus('success')

        toast({
          title: 'Code resent',
          type: 'success',
        })
      })
      .catch(() => {
        setResendStatus('error')
      })
  }

  return (
    <Flex
      direction="column"
      className="bg-white w-full max-w-[500px] rounded-3 p-12 shadow-3"
    >
      <Flex direction="column" gap="2" mb="4">
        <Heading weight="medium" className="text-[36px] text-accent-12">
          {reset ? 'Reset' : 'Forgot'} Password
        </Heading>
        <Flex direction="column" gap="4">
          <Text className="text-gray-11">
            {`Enter the code that was sent to ${email}.`}
          </Text>

          <Flex align="center" gap="2">
            <Text>
              Didn&apos;t receive a code?&nbsp;
              <Text
                onClick={resendStatus !== 'sending' ? resendCode : undefined}
                className={cn('cursor-pointer text-accent-11 underline', {
                  'cursor-not-allowed text-gray-11': resendStatus === 'sending',
                })}
              >
                Resend code
              </Text>
            </Text>
            {resendStatus === 'sending' ? (
              <Loader2Icon
                width={20}
                height={20}
                className="animate-spin text-accent-12"
              />
            ) : null}
            {resendStatus === 'success' ? (
              <CheckIcon width={20} height={20} className="text-green-9" />
            ) : null}
            {resendStatus === 'error' ? (
              <XIcon width={20} height={20} className="text-tomato-9" />
            ) : null}
          </Flex>
        </Flex>
      </Flex>
      <FormError message={error} />
      <FormContainer form={form} onSubmit={onSubmit}>
        <Flex direction="column" gap="3">
          <FormField name="resetCode" label="Code">
            <CodeInput name="resetCode" />
          </FormField>
          <FormField name="newPassword" label="New Password">
            <PasswordInput
              placeholder="Enter new password"
              {...form.register('newPassword')}
              value={form.watch('newPassword')}
            />
          </FormField>
          <FormField name="confirmPassword" label="Confirm Password">
            <PasswordInput
              placeholder="Enter confirm password"
              {...form.register('confirmPassword')}
              value={form.watch('confirmPassword')}
            />
          </FormField>
          <PasswordRequirements
            newPassword={form.watch('newPassword')}
            confirmPassword={form.watch('confirmPassword')}
            configuration={configuration}
          />
        </Flex>
        <FormSubmitButton size="4" className="mt-4" disabled={!isValid}>
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

export { PasswordResetForm }
