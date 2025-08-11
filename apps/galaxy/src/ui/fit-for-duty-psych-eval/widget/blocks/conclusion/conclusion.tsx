'use client'

import { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { BlockHeading } from '../../block-heading'
import { RadioFieldWithError } from '../../components'
import { CONCLUSION_BLOCK_CONFIG, DID_OPTIONS } from '../../constant'
import { SchemaType } from '../../schema'
import { BlockProps } from '../../types'
import { RecommendationInput } from './recommendation-input'

const Conclusion = ({ disabled = false }: BlockProps) => {
  const { watch, setValue } = useFormContext<SchemaType>()
  const hasReasonableAccommodation = watch('hasReasonableAccommodation')
  useEffect(() => {
    if (hasReasonableAccommodation && hasReasonableAccommodation !== 'are') {
      setValue('recommendedAccommodations', '')
    }
  }, [hasReasonableAccommodation, setValue])
  return (
    <BlockHeading title="Conclusion">
      {CONCLUSION_BLOCK_CONFIG.map(({ field, heading, options }) => (
        <RadioFieldWithError
          key={field}
          label={heading}
          field={field}
          options={options}
          disabled={disabled}
          required
        />
      ))}

      <RecommendationInput disabled={disabled} />

      <RadioFieldWithError
        label="Provider gave recommendations to the patient."
        field="providerGaveRecommendationsToSubject"
        options={DID_OPTIONS}
        disabled={disabled}
        required
      />
    </BlockHeading>
  )
}
export { Conclusion }
