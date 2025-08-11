'use client'

import {
  AutoResizeInput,
  FormFieldContainer,
  FormFieldError,
} from '@/components'
import { BlockProps } from '@/ui/fit-for-duty-psych-eval/widget/types'

const PrePatientOtherInput = ({ disabled = false }: BlockProps) => {
  return (
    <FormFieldContainer className="absolute right-[84px] top-[54px] flex-row gap-2">
      <AutoResizeInput
        field="livingArrangementOtherDetails"
        className="!min-w-32"
        maxLength={50}
        disabled={disabled}
      />
      <FormFieldError name="livingArrangementOtherDetails" />
    </FormFieldContainer>
  )
}

export { PrePatientOtherInput }
