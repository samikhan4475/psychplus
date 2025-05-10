import { zodResolver } from '@hookform/resolvers/zod'
import { Flex, TextField } from '@radix-ui/themes'
import { SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import {
  FormContainer,
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
  FormSubmitButton,
} from '@/components'
import { useStore } from '@/store'
import { changePassword, validateCurrentPassword } from './actions'
import { schema, SchemaType } from './schema'

const RestPasswordForm = () => {
  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    criteriaMode: 'all',
  })
  const staff = useStore((state) => state.staffResource)

  const handleSubmit: SubmitHandler<SchemaType> = async (e) => {
    const isCurrentPasswordCorrect = await validateCurrentPassword({
      username: staff.contactInfo.email,
      password: e.currentPassword,
    })
    if (!isCurrentPasswordCorrect) {
      toast.error('Current password is incorrect')
      return
    }
    const result = await changePassword(e)
    if (result.state === 'error') {
      toast.error(result.error)
    } else {
      toast.success('Password changed successfully')
    }
  }

  return (
    <FormContainer form={form} className="gap-2" onSubmit={handleSubmit}>
      <FormFieldContainer>
        <FormFieldLabel required>Current Password</FormFieldLabel>
        <TextField.Root
          size="1"
          type="password"
          className="border-pp-gray-2 w-full border border-solid !outline-none [box-shadow:none]"
          {...form.register('currentPassword')}
        />
        <FormFieldError name="currentPassword" />
      </FormFieldContainer>
      <FormFieldContainer>
        <FormFieldLabel required>Password</FormFieldLabel>
        <TextField.Root
          size="1"
          type="password"
          className="border-pp-gray-2 w-full border border-solid !outline-none [box-shadow:none]"
          {...form.register('newPassword')}
        />
        <FormFieldError name="newPassword" />
      </FormFieldContainer>
      <FormFieldContainer>
        <FormFieldLabel required>Confirm Password</FormFieldLabel>
        <TextField.Root
          size="1"
          type="password"
          className="border-pp-gray-2 w-full border border-solid !outline-none [box-shadow:none]"
          {...form.register('confirmPassword')}
        />
        <FormFieldError name="confirmPassword" />
      </FormFieldContainer>
      <Flex justify="end">
        <FormSubmitButton form={form} highContrast>
          Reset
        </FormSubmitButton>
      </Flex>
    </FormContainer>
  )
}

export { RestPasswordForm }
