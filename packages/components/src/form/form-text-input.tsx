import { ErrorMessage } from '@hookform/error-message'
import { Flex } from '@radix-ui/themes'
import type {
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
} from 'react-hook-form'
import { TextField, type TextFieldInputProps } from '@psychplus/ui/text-field'
import { FormFieldErrors, Required, validate } from '@/form'

interface TextInputProps<T extends FieldValues> extends TextFieldInputProps {
  name: Path<T>
  register: UseFormRegister<T>
  errors: FieldErrors
}

const FormTextInput = <T extends FieldValues>({
  name,
  register,
  errors,
  ...inputProps
}: TextInputProps<T>) => (
  <Flex direction="column" gap="1">
    <TextField.Input
      size="3"
      {...register(name, validate(Required))}
      {...inputProps}
    />
    <ErrorMessage name={name} errors={errors} render={FormFieldErrors} />
  </Flex>
)

export { FormTextInput }
