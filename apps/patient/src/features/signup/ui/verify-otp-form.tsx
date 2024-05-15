import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormContainer } from '@psychplus-v2/components'
import { cn, getPaddedDateString } from '@psychplus-v2/utils'
import { Box, Dialog, Flex, Heading, Text } from '@radix-ui/themes'
import { CheckIcon, Loader2Icon, XIcon } from 'lucide-react'
import { useForm } from 'react-hook-form'
import z from 'zod'
import {
  CloseDialogIcon,
  CodeInput,
  DialogTitle,
  FormError,
  FormField,
  FormSubmitButton,
} from '@/components-v2'
import { useToast } from '@/providers'
import { sendSignupOtpAction, signupAction } from '../actions'
import { SignupUserParams } from '../types'
import { SchemaType as SignupFormSchemaType } from './signup-from'

interface VerifyOtpFormProps {
  dialogOpen: boolean
  setDialogOpen: (open: boolean) => void
  formData: SignupFormSchemaType
}

type CodeSendStatus = 'success' | 'error' | 'idle' | 'sending'

const schema = z.object({
  otpCode: z.string().length(5, 'Invalid code'),
})

type SchemaType = z.infer<typeof schema>

const VerifyOtpForm = ({
  dialogOpen,
  formData,
  setDialogOpen,
}: VerifyOtpFormProps) => {
  const [resendStatus, setResendStatus] = useState<CodeSendStatus>('idle')
  const [error, setError] = useState<string>()
  const { toast } = useToast()

  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    reValidateMode: 'onChange',
    defaultValues: {
      otpCode: '',
    },
  })

  const resendCode = async () => {
    setResendStatus('sending')

    const sendSignupOtpResponse = await sendSignupOtpAction({
      emailAddress: formData.email,
    })

    if (sendSignupOtpResponse.state === 'error') {
      setResendStatus('error')
      return
    }

    setResendStatus('success')
    toast({
      title: 'Code resent',
      type: 'success',
    })
  }

  const onSubmit = async (data: SchemaType) => {
    setError(undefined)
    const signupActionParams: SignupUserParams = {
      legalName: {
        firstName: formData.firstName,
        lastName: formData.lastName,
      },
      dateOfBirth: getPaddedDateString(formData.dateOfBirth),
      contactInfo: {
        email: formData.email,
        phoneNumbers: [
          {
            number: formData.phoneNumber,
            type: 'Contact',
          },
        ],
      },
      password: formData.newPassword,
      confirmPassword: formData.confirmPassword,
      otpCode: data.otpCode,
      termsOfServiceConsentOn: new Date().toISOString(),
      hipaaConsentOn: new Date().toISOString(),
      privacyPolicyConsentOn: new Date().toISOString(),
    }

    if (formData.hasGuardian) {
      signupActionParams.guardian = {
        name: {
          firstName: formData.guardianFirstname,
          lastName: formData.guardianLastname,
        },
      }
    }
    const signupResponse = await signupAction(signupActionParams)

    if (signupResponse?.state === 'error') {
      setError(signupResponse.error)
    }
  }
  return (
    <Dialog.Root
      open={dialogOpen}
      onOpenChange={(open) => {
        if (!open) {
          form.reset()
          setError(undefined)
        }
        setDialogOpen(open)
      }}
    >
      <Dialog.Content className="relative max-w-md pt-10">
        <CloseDialogIcon />
        <DialogTitle className="mb-1 font-serif">
          <Heading size="8">Verify your account</Heading>
        </DialogTitle>
        <Flex direction="column" gap="2">
          <Box>
            <Text className="text-gray-11">
              {`Enter the code that was sent to ${formData.email}.`}
            </Text>
            <FormError className="mt-2" message={error} />
          </Box>

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
        <FormContainer form={form} onSubmit={onSubmit}>
          <FormField name="otpCode" label="Code">
            <CodeInput name="otpCode" />
          </FormField>
          <FormSubmitButton size="3" highContrast className="mt-4">
            Submit
          </FormSubmitButton>
        </FormContainer>
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { VerifyOtpForm }
