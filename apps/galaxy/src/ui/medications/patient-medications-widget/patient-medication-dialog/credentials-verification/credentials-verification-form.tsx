'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Flex } from '@radix-ui/themes'
import { Info, ShieldCheck } from 'lucide-react'
import { SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { FormContainer } from '@/components'
import { validateUserCreds } from '../../actions'
import { IconBlock } from '../shared'
import { StepComponentProps } from '../types'
import { PasswordInput } from './password-input'
import { CredentialsVerificationSchemaType, schema } from './schema'
import { UsernameInput } from './username-input'

const CredentialsVerificationForm = ({
  onPrev,
  onNext,
}: StepComponentProps) => {
  const form = useForm({
    defaultValues: {
      username: '',
      password: '',
    },
    resolver: zodResolver(schema),
    reValidateMode: 'onChange',
  })

  const onSubmit: SubmitHandler<CredentialsVerificationSchemaType> = async (
    data,
  ) => {
    const payload = {
      username: data.username as string,
      password: data.password as string,
    }
    const result = await validateUserCreds(payload)

    if (result.state === 'error') {
      toast.error(result.error || 'Verification failed')
      return
    }

    toast.success('Verification Successful')
    onNext()
  }

  return (
    <FormContainer
      disabled={form.formState.isSubmitting}
      form={form}
      onSubmit={onSubmit}
    >
      <Flex direction="column" justify="between" className="min-h-[491px]">
        <Flex direction="column" gap="3">
          <IconBlock
            className="mb-4"
            title="
        By proceeding, you authorizing these medication orders. Please verify
        your identity to complete this process."
            icon={<Info size={24} className="min-w-6 text-pp-gray-3" />}
          />
          <UsernameInput />
          <PasswordInput />
          <IconBlock
            className="bg-transparent"
            title="Your credentials will be securely verified with our system."
            icon={<ShieldCheck size={24} className="min-w-6 text-pp-green-2" />}
          />
        </Flex>
        <Flex gap="2" justify="end">
          <Button
            size="2"
            variant="outline"
            color="gray"
            type="button"
            className="text-black"
            onClick={onPrev}
          >
            Back
          </Button>
          <Button
            size="2"
            type="button"
            highContrast
            loading={form.formState.isSubmitting}
            onClick={form.handleSubmit(onSubmit)}
          >
            Continue
          </Button>
        </Flex>
      </Flex>
    </FormContainer>
  )
}

export { CredentialsVerificationForm, type CredentialsVerificationSchemaType }
