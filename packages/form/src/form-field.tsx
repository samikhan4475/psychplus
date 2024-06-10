import { Flex, Text } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'

interface UseFormFieldProps extends React.PropsWithChildren {
  name: string
  label: string
  required?: boolean
}

export const useFormField = <Props extends UseFormFieldProps>(props: Props) => {
  const { label, name, required, ...otherProps } = props
  const id = name

  return {
    formFieldProps: { id, name, label, required },
    childProps: { ...otherProps, id, name },
  }
}

interface FormFieldProps extends UseFormFieldProps {
  id: string
}

const FormField = ({ children, name, id, label, required }: FormFieldProps) => {
  const ctx = useFormContext()
  const state = ctx.getFieldState(name, ctx.formState)

  return (
    <Flex direction="column" gap="1">
      <Text as="label" size="2" weight="bold" htmlFor={id}>
        {label} {required && <span className='text-[#FF0000]'>*</span>}
      </Text>
      {children}
      {state.error && (
        <Text size="2" color="red">
          {state.error.message}
        </Text>
      )}
    </Flex>
  )
}

export { FormField, type UseFormFieldProps }
