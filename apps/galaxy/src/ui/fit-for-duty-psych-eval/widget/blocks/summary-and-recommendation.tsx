'use client'

import { BlockHeading } from '../block-heading'
import { DetailsField } from '../components'
import { SUMMARY_AND_RECOMMENDATION } from '../constant'
import { BlockProps } from '../types'

const SummaryAndRecommendation = ({ disabled = false }: BlockProps) => {
  return (
    <BlockHeading title="Summary and Recommendation">
      <DetailsField
        field="summaryRecommendation"
        label={SUMMARY_AND_RECOMMENDATION}
        maxLength={2000}
        disabled={disabled}
      />
    </BlockHeading>
  )
}
export { SummaryAndRecommendation }
