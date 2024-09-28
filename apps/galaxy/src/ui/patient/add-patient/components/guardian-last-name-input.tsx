import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components'
import { SchemaType } from '../schema'

const GuardianLastNameInput = () => {
  const form = useFormContext<SchemaType>()

  return (
    <FormFieldContainer className="flex-1">
      <FormFieldLabel required>Guardian Last Name</FormFieldLabel>
      <TextField.Root
        size="1"
        {...form.register('guardianLastName')}
        placeholder="Last Name"
      />
      <FormFieldError name="guardianLastName" />
    </FormFieldContainer>
  )
}

export { GuardianLastNameInput }
