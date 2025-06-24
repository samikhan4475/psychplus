'use client'

import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Flex, Text } from '@radix-ui/themes'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { logoutAction } from '@/actions'
import {
  EditableFieldValue,
  FormError,
  FormFieldContainer,
  FormFieldLabel,
  LabelAndValue,
  PasswordInput,
  PasswordRequirements,
  ToggleableForm,
} from '@/components-v2'
import { getPlaceholder } from '@/features/account/profile/utils'
import { changePasswordAction } from '@/features/account/security/actions'
import { useValidateNewPassword } from '@/hooks'

const schema = z.object({
  currentPassword: z.string().trim().min(1, 'Required'),
  newPassword: z.string().trim().min(1, 'Required'),
  confirmPassword: z.string().trim().min(1, 'Required'),
})

type SchemaType = z.infer<typeof schema>

const ChangePasswordForm = () => {
  const [error, setError] = useState<string>()

  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    reValidateMode: 'onChange',
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  })

  const { isValid } = useValidateNewPassword(form.getValues())

  const submitAction = (data: SchemaType) => {
    setError(undefined)
    return changePasswordAction(data)
  }

  const trigger = (
    <Flex align="end" gap="2">
      <Text size="1" className="tracking-[0.5px]">
        &#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;
      </Text>

      <EditableFieldValue />
    </Flex>
  )

  return (
    <LabelAndValue label="Password">
      <ToggleableForm
        form={form}
        submitAction={submitAction}
        onSuccess={logoutAction}
        onError={setError}
        trigger={trigger}
        disabled={!isValid}
        toastData={{
          title: 'Successfully changed password',
        }}
      >
        <FormError message={error} />
        <FormFieldContainer className="w-full">
          <FormFieldLabel>Current Password</FormFieldLabel>
          <PasswordInput
            size={{ initial: '2', sm: '3' }}
            className="text-[13px] sm:text-[14px]"
            maxLength={32}
            placeholder={getPlaceholder('currentPassword')}
            {...form.register('currentPassword')}
            value={form.watch('currentPassword')}
          />
        </FormFieldContainer>
        <FormFieldContainer className="w-full">
          <FormFieldLabel>New Password</FormFieldLabel>
          <PasswordInput
            size={{ initial: '2', sm: '3' }}
            className="text-[13px] sm:text-[14px]"
            maxLength={32}
            placeholder={getPlaceholder('newPassword')}
            {...form.register('newPassword')}
            value={form.watch('newPassword')}
          />
        </FormFieldContainer>
        <FormFieldContainer className="w-full">
          <FormFieldLabel>Confirm New Password</FormFieldLabel>
          <PasswordInput
            size={{ initial: '2', sm: '3' }}
            className="text-[13px] sm:text-[14px]"
            maxLength={32}
            placeholder={getPlaceholder('confirmPassword')}
            {...form.register('confirmPassword')}
            value={form.watch('confirmPassword')}
          />
        </FormFieldContainer>
        <PasswordRequirements
          newPassword={form.watch('newPassword')}
          confirmPassword={form.watch('confirmPassword')}
        />
      </ToggleableForm>
    </LabelAndValue>
  )
}

export { ChangePasswordForm }
