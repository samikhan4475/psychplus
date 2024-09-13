import React, { forwardRef } from 'react'
import { TextField } from '@radix-ui/themes'
import { PatternFormat } from 'react-number-format'

interface ZipcodeInputProps
  extends React.ComponentProps<typeof TextField.Root> {
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
      customInput={TextField.Root}
      getInputRef={ref}
      {...rest}
    />
  ),
)

ZipcodeInput.displayName = 'ZipcodeInput'

export { ZipcodeInput }
