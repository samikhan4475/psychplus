'use client'

import {
  AutoResizeInput,
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components'
import { BlockProps } from '../../types'

const EmploymentPriorInput = ({ disabled = false }: BlockProps) => {
  return (
    <FormFieldContainer className="flex flex-row items-center gap-2">
      <FormFieldLabel required>
        Prior to that, patient worked as a
      </FormFieldLabel>
      <AutoResizeInput
        field="priorPosition"
        className="!min-w-32"
        maxLength={20}
        disabled={disabled}
      />
      <FormFieldError name="priorPosition" />
    </FormFieldContainer>
  )
}

export { EmploymentPriorInput }
