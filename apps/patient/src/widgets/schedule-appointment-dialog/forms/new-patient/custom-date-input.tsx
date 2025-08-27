import React, { forwardRef } from 'react'
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
          radius="full"
          size="3"
          {...inputProps}
          ref={ref}
          onClick={onClick}
          className=" w-[130px] text-4 max-sm:h-7 max-xs:h-6 sm:h-8 md:h-8 md:px-[10px] lg:h-10"
        />
      )}
    </ReactInputMask>
  ),
)

CustomDateInput.displayName = 'CustomInput'

export default CustomDateInput
