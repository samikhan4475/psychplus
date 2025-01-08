import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components'
import { LocationSchemaType } from './schema'

const NpiInput = () => {
  const form = useFormContext<LocationSchemaType>()
  return (
    <FormFieldContainer className="flex flex-col gap-0.5">
      <FormFieldLabel required>NPI</FormFieldLabel>
      <TextField.Root size="1" {...form.register('npi')} />
      <FormFieldError name="npi" />
    </FormFieldContainer>
  )
}

export { NpiInput }
