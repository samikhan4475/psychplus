'use client'

import {
  AutoResizeInput,
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components'
import { BlockProps } from '../../types'

const PositionInput = ({ disabled = false }: BlockProps) => {
  return (
    <FormFieldContainer className="flex-row items-center gap-2">
      <FormFieldLabel required className="!text-1">
        How long were they at the position in the previous question?
      </FormFieldLabel>
      <AutoResizeInput
        field="positionDuration"
        className="!min-w-32"
        maxLength={20}
        disabled={disabled}
      />
      <FormFieldError name="positionDuration" />
    </FormFieldContainer>
  )
}

export { PositionInput }
