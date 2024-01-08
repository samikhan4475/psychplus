import { Text } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'

interface FormFieldErrorProps {
  name: string
}

const FormFieldError = ({ name }: FormFieldErrorProps) => {
  const form = useFormContext()
  const error = form.getFieldState(name, form.formState).error

  return error ? (
    <Text size="2" color="red">
      {error.message}
    </Text>
  ) : null
}

export { FormFieldError }
