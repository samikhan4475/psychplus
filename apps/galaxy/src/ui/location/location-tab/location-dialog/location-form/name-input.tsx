import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components'
import { LocationSchemaType } from './schema'

const NameInput = () => {
  const form = useFormContext<LocationSchemaType>()
  return (
    <FormFieldContainer className="flex flex-col gap-0.5">
      <FormFieldLabel required>Name</FormFieldLabel>
      <TextField.Root size="1" {...form.register('name')} />
      <FormFieldError name="name" />
    </FormFieldContainer>
  )
}

export { NameInput }
