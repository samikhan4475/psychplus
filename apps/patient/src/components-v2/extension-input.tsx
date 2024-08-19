import { forwardRef } from 'react'
import { TextFieldInput } from '@radix-ui/themes'
import { PatternFormat } from 'react-number-format'

interface ExtensionInputProps
  extends React.ComponentProps<typeof TextFieldInput> {
  value?: string
  defaultValue?: string
}

const ExtensionInput = forwardRef<HTMLInputElement, ExtensionInputProps>(
  ({ type, ...rest }, ref) => (
    <PatternFormat
      size="3"
      type="text"
      inputMode="numeric"
      format="##########"
      placeholder="Extension"
      customInput={TextFieldInput}
      getInputRef={ref}
      {...rest}
    />
  ),
)

ExtensionInput.displayName = 'ExtensionInput'

export { ExtensionInput }
