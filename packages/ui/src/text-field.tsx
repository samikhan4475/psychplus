import { TextField } from '@radix-ui/themes'

interface TextFieldInputProps extends React.ComponentPropsWithRef<typeof TextField.Root> {
  name?: string
  value?: string
  disabled?: boolean
}

export { TextField, type TextFieldInputProps }
