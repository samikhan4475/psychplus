import { Text } from '@radix-ui/themes'

interface FormFieldLabelProps {
  id?: string
}

const FormFieldLabel = ({
  id,
  children,
}: React.PropsWithChildren<FormFieldLabelProps>) => {
  return (
    <Text as="label" size="2" weight="bold" htmlFor={id}>
      {children}
    </Text>
  )
}

export { FormFieldLabel }
