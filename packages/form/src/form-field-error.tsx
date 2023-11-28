import { Text } from '@radix-ui/themes'

interface FormFieldErrorProps {
  message?: string
}

const FormFieldError = ({ message }: FormFieldErrorProps) => {
  if (!message) {
    return null
  }
  return (
    <Text size="2" color="red">
      {message}
    </Text>
  )
}

export { FormFieldError }
