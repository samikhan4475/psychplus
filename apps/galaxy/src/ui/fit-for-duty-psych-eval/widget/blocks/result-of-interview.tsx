'use client'

import { BlockHeading } from '../block-heading'
import { DetailsField } from '../components'
import { RESULT_OF_INTERVIEW } from '../constant'
import { BlockProps } from '../types'

const ResultOfInterview = ({ disabled = false }: BlockProps) => {
  return (
    <BlockHeading title="Results of Interview">
      <DetailsField
        field="incidentNarrative"
        label={RESULT_OF_INTERVIEW}
        maxLength={2000}
        disabled={disabled}
      />
    </BlockHeading>
  )
}
export { ResultOfInterview }
