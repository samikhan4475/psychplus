'use client'

import {
  AutoResizeInput,
  FormFieldContainer,
  FormFieldError,
} from '@/components'
import { BlockProps } from '../../types'

const IntervieweeRoleInput = ({ disabled = false }: BlockProps) => {
  return (
    <FormFieldContainer className="flex-row gap-2">
      <AutoResizeInput
        field="intervieweeRoleOtherDetails"
        className="!min-w-32"
        maxLength={50}
        disabled={disabled}
      />
      <FormFieldError name="intervieweeRoleOtherDetails" />
    </FormFieldContainer>
  )
}

export { IntervieweeRoleInput }
