import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components'

const CodeInput = () => {
  const form = useFormContext()
  return (
    <FormFieldContainer>
      <FormFieldLabel>Code</FormFieldLabel>
      <TextField.Root
        size="2"
        {...form.register('resetCode')}
        placeholder="Enter Code"
        radius="full"
      />
      <FormFieldError name="resetCode" />
    </FormFieldContainer>
  )
}

export { CodeInput }
