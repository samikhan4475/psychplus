'use client'

import {
  AutoResizeInput,
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components'
import { BlockProps } from '../../types'

const HistoryInput = ({ disabled = false }: BlockProps) => {
  return (
    <FormFieldContainer className="flex-row items-start gap-2">
      <FormFieldLabel required className="!text-1">
        What city are they currently living in?
      </FormFieldLabel>
      <AutoResizeInput
        field="currentCity"
        className="!min-w-32"
        maxLength={20}
        disabled={disabled}
      />
      <FormFieldError name="currentCity" />
    </FormFieldContainer>
  )
}

export { HistoryInput }
