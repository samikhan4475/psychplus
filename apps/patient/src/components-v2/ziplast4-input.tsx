import { forwardRef } from 'react'
import { TextFieldInput } from '@radix-ui/themes'
import { PatternFormat } from 'react-number-format'

interface ZipLast4InputProps
  extends React.ComponentProps<typeof TextFieldInput> {
  value?: string
  defaultValue?: string
}

const ZipLast4Input = forwardRef<HTMLInputElement, ZipLast4InputProps>(
  ({ type, ...rest }, ref) => (
    <PatternFormat
      size="3"
      type="text"
      inputMode="numeric"
      format="####"
      placeholder="Area Code"
      customInput={TextFieldInput}
      getInputRef={ref}
      {...rest}
    />
  ),
)

ZipLast4Input.displayName = 'ZipLast4Input'

export { ZipLast4Input }
