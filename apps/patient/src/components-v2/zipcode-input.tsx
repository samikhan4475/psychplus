import { forwardRef } from 'react'
import { TextFieldInput } from '@radix-ui/themes'
import { PatternFormat } from 'react-number-format'

interface ZipcodeInputProps
  extends React.ComponentProps<typeof TextFieldInput> {
  value?: string
  defaultValue?: string
}

const ZipcodeInput = forwardRef<HTMLInputElement, ZipcodeInputProps>(
  ({ type, ...rest }, ref) => (
    <PatternFormat
      size="3"
      type="text"
      inputMode="numeric"
      format="#####"
      placeholder="Zip"
      customInput={TextFieldInput}
      getInputRef={ref}
      {...rest}
    />
  ),
)

ZipcodeInput.displayName = 'ZipcodeInput'

export { ZipcodeInput }
