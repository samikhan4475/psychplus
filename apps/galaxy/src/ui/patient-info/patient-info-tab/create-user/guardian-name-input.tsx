import { Flex, TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components'
import { CreateUserSchema } from './create-user-schema'

const GuardianNameInput = () => {
  const form = useFormContext<CreateUserSchema>()

  const hasGuardian = form.watch('hasGuardian')

  if (hasGuardian === 'no') {
    return null
  }

  return (
    <Flex gap="2">
      <FormFieldContainer className="w-64">
        <FormFieldLabel required>Guardian First Name</FormFieldLabel>
        <TextField.Root size="1" {...form.register('guardianFirstName')} />
        <FormFieldError name="guardianFirstName" />
      </FormFieldContainer>
      <FormFieldContainer className="w-64">
        <FormFieldLabel required>Guardian Last Name</FormFieldLabel>
        <TextField.Root size="1" {...form.register('guardianLastName')} />
        <FormFieldError name="guardianLastName" />
      </FormFieldContainer>
    </Flex>
  )
}

export { GuardianNameInput }
