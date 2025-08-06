'use client'

import { useFormContext } from 'react-hook-form'
import {
  AutoResizeInput,
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components'
import { SchemaType } from '../../schema'
import { BlockProps } from '../../types'

const RecommendationInput = ({ disabled = false }: BlockProps) => {
  const { watch } = useFormContext<SchemaType>()
  const hasReasonableAccommodation = watch('hasReasonableAccommodation')

  if (hasReasonableAccommodation !== 'are') return null

  return (
    <FormFieldContainer className="flex-1 gap-2">
      <FormFieldLabel required>
        My recommended accommodations are:
      </FormFieldLabel>
      <AutoResizeInput
        field="recommendedAccommodations"
        maxLength={200}
        disabled={disabled}
        className="min-h-24 !w-full !max-w-full"
      />
      <FormFieldError name="recommendedAccommodations" />
    </FormFieldContainer>
  )
}

export { RecommendationInput }
