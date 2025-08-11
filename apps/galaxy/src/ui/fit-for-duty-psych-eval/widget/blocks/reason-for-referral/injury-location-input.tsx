'use client'

import {
  AutoResizeInput,
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components'
import { BlockProps } from '../../types'

const InjuryLocationInput = ({ disabled = false }: BlockProps) => {
  return (
    <FormFieldContainer className="flex-row items-start gap-2">
      <FormFieldLabel required className="pt-0.5">
        Injury location
      </FormFieldLabel>
      <AutoResizeInput
        field="injuryLocation"
        className="!min-w-32"
        maxLength={50}
        disabled={disabled}
      />
      <FormFieldError name="injuryLocation" />
    </FormFieldContainer>
  )
}

export { InjuryLocationInput }
