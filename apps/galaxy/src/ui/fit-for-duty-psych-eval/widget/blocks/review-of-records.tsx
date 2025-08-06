'use client'

import { BlockHeading } from '../block-heading'
import { DetailsField } from '../components'
import { BlockProps } from '../types'

const ReviewOfRecords = ({ disabled = false }: BlockProps) => {
  return (
    <BlockHeading title="Review of Records">
      <DetailsField
        field="incidentDescription"
        label="Description of the incident at the time of referral:"
        maxLength={1200}
        className="min-h-16"
        disabled={disabled}
      />
    </BlockHeading>
  )
}
export { ReviewOfRecords }
