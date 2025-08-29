'use client'

import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { User } from '@psychplus-v2/auth'
import { FormContainer } from '@psychplus-v2/components'
import { Flex, TextFieldInput } from '@radix-ui/themes'
import { useForm } from 'react-hook-form'
import z from 'zod'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
  FormSubmitButton,
} from '@/components-v2'
import { CallCompositeContainer } from './blocks/call-composit'
import { AcsInfo } from './types'

const AV_FORM_NAME_INPUT = 'login-form-email-input'

const schema = z.object({
  name: z.string().trim().min(3, 'name is required'),
})

type SchemaType = z.infer<typeof schema>

interface Props {
  acsInfo: AcsInfo
  user?: User
}

const UnauthenticatedCallView = ({ acsInfo, user }: Props) => {
  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    reValidateMode: 'onChange',
    defaultValues: {
      name: '',
    },
  })

  const [username, setUsername] = useState<string | undefined>(
    user ? `${user.firstName} ${user.lastName}` : undefined,
  )

  if (!username) {
    return (
      <Flex
        direction="column"
        className="flex h-[100%] w-full flex-1 flex-col items-center justify-center overflow-y-auto px-2.5 py-0.5 shadow-1"
      >
        <FormContainer form={form} onSubmit={(data) => setUsername(data.name)}>
          <Flex direction="column" gap="6" width={'max-content'}>
            <Flex direction="column" gap="4">
              <FormFieldContainer>
                <FormFieldLabel id={AV_FORM_NAME_INPUT}>Name</FormFieldLabel>
                <TextFieldInput
                  size="3"
                  placeholder="Enter name"
                  {...form.register('name')}
                  id={AV_FORM_NAME_INPUT}
                />
                <FormFieldError name="name" />
              </FormFieldContainer>
            </Flex>
            <FormSubmitButton size="4" highContrast>
              Start call
            </FormSubmitButton>
          </Flex>
        </FormContainer>
      </Flex>
    )
  }
  return (
    <Flex
      direction="column"
      className="flex w-full flex-1 flex-col overflow-y-auto px-2.5 py-0.5 shadow-1"
    >
      <CallCompositeContainer acsInfo={acsInfo} username={username} />
    </Flex>
  )
}

export { UnauthenticatedCallView }