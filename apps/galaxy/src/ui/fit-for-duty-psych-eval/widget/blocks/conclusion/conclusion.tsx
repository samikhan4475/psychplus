'use client'

import { BlockHeading } from '../../block-heading'
import { RadioFieldWithError } from '../../components'
import { CONCLUSION_BLOCK_CONFIG, DID_OPTIONS } from '../../constant'
import { BlockProps } from '../../types'
import { RecommendationInput } from './recommendation-input'

const Conclusion = ({ disabled = false }: BlockProps) => {
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
