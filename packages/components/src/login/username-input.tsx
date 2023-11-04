import { ErrorMessage } from '@hookform/error-message'
import type { FieldErrors, UseFormRegister } from 'react-hook-form'
import { TextField } from '@psychplus/ui/text-field'
import { FormFieldContainer, FormFieldErrors, Required, validate } from '@/form'
import { LoginFormValues } from './login-form'

interface UsernameInputProps {
  register: UseFormRegister<LoginFormValues>
  errors: FieldErrors<LoginFormValues>
}

const UsernameInput = ({ register, errors }: UsernameInputProps) => (
  <FormFieldContainer>
    <TextField.Input
      autoFocus
      size="3"
      placeholder="Email"
      type="text"
      data-testid="login-username-input"
      {...register('username', validate(Required))}
    />
    <ErrorMessage name="username" errors={errors} render={FormFieldErrors} />
  </FormFieldContainer>
)

export { UsernameInput }
