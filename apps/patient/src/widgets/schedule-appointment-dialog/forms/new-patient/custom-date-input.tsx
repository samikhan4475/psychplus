import React, { forwardRef } from 'react'
import { cn } from '@psychplus-v2/utils'
import ReactInputMask from 'react-input-mask'
import { TextField } from '@psychplus/ui/text-field'

interface CustomInputProps {
  value?: string
  onClick?: () => void
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
}

const CustomDateInput = forwardRef<HTMLInputElement, CustomInputProps>(
  ({ value, onClick, onChange, placeholder }, ref) => (
    <ReactInputMask
      mask="99/99/9999"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    >
      {(inputProps) => (
        <TextField.Root
          size="3"
          {...inputProps}
          ref={ref}
          onClick={onClick}
          className="h-[35px] w-[200px] rounded-6 text-4 lg:h-[45px]"
        />
      )}
    </ReactInputMask>
  ),
)

CustomDateInput.displayName = 'CustomInput'

export default CustomDateInput
