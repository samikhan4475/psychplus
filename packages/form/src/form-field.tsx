import { Box, Text } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'

interface UseFormFieldProps extends React.PropsWithChildren {
  name: string
  label: string
}

export const useFormField = <Props extends UseFormFieldProps>(props: Props) => {
  const { label, name, ...otherProps } = props
  const id = name

  return {
    formFieldProps: { id, name, label },
    childProps: { ...otherProps, id, name },
  }
}

interface FormFieldProps extends UseFormFieldProps {
  id: string
}

const FormField = ({ children, name, id, label }: FormFieldProps) => {
  const ctx = useFormContext()
  const state = ctx.getFieldState(name, ctx.formState)

  return (
    <Box>
      <label htmlFor={id}>
        <Text as="div" size="2" mb="1" weight="bold">
          {label}
        </Text>
      </label>
      {children}
      {state.error && (
        <Text size="2" color="red">
          {state.error.message}
        </Text>
      )}
    </Box>
  )
}

export { FormField, type UseFormFieldProps }
