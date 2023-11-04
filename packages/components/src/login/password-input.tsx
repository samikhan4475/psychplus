import { ErrorMessage } from '@hookform/error-message'
import type { FieldErrors, UseFormRegister } from 'react-hook-form'
import { TextField } from '@psychplus/ui/text-field'
import { FormFieldContainer, FormFieldErrors, Required, validate } from '@/form'
import { LoginFormValues } from './login-form'

interface PasswordInputProps {
  register: UseFormRegister<LoginFormValues>
  errors: FieldErrors
}

const PasswordInput = ({ register, errors }: PasswordInputProps) => (
  <FormFieldContainer>
    <TextField.Input
      size="3"
      placeholder="Password"
      type="password"
      data-testid="login-password-input"
      {...register('password', validate(Required))}
    />
    <ErrorMessage name="password" errors={errors} render={FormFieldErrors} />
  </FormFieldContainer>
)

export { PasswordInput }
