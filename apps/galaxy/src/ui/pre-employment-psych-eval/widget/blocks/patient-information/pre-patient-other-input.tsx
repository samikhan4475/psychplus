'use client'

import {
  AutoResizeInput,
  FormFieldContainer,
  FormFieldError,
} from '@/components'
import { BlockProps } from '@/ui/fit-for-duty-psych-eval/widget/types'

const PrePatientOtherInput = ({ disabled = false }: BlockProps) => {
  return (
    <FormFieldContainer className="absolute left-[530px] top-[54px] whitespace-nowrap">
      <AutoResizeInput
        field="livingArrangementOtherDetails"
        className="!min-w-32 max-h-[31px]"
        maxLength={50}
        disabled={disabled}
      />
      <FormFieldError
        className="absolute right-[-58px] top-0.5"
        name="livingArrangementOtherDetails"
      />
    </FormFieldContainer>
  )
}

export { PrePatientOtherInput }
