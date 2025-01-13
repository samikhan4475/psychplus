import { EnvelopeClosedIcon } from '@radix-ui/react-icons'
import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components'

const EmailInput = () => {
  const form = useFormContext()
  return (
    <FormFieldContainer>
      <FormFieldLabel>Email Address</FormFieldLabel>
      <TextField.Root
        size="2"
        {...form.register('email')}
        radius="full"
        placeholder="hello@email.com"
      >
        <TextField.Slot>
          <EnvelopeClosedIcon height="16" width="16" />
        </TextField.Slot>
      </TextField.Root>
      <FormFieldError name="email" />
    </FormFieldContainer>
  )
}

export { EmailInput }
