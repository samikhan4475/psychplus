import { Text } from '@radix-ui/themes'
import type { MultipleFieldErrors } from 'react-hook-form'

interface FormFieldErrorsProps {
  messages?: MultipleFieldErrors
}

const FormFieldErrors = ({ messages }: FormFieldErrorsProps) =>
  messages
    ? Object.entries(messages).map(([type, message]) => (
        <Text key={type} size="2" color="tomato">
          {message}
        </Text>
      ))
    : null

export { FormFieldErrors }
