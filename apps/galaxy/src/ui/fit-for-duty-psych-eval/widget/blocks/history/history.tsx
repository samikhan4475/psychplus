'use client'

import { BlockHeading } from '../../block-heading'
import { RadioFieldWithError } from '../../components'
import { DOES_OPTIONS, RELATIONSHIP_STATUS_OPTIONS } from '../../constant'
import { BlockProps } from '../../types'
import { HistoryInput } from './history-input'

const History = ({ disabled = false }: BlockProps) => {
  return (
    <BlockHeading title="History">
      <RadioFieldWithError
        field="relationshipStatus"
        label="Current relationship status:"
        options={RELATIONSHIP_STATUS_OPTIONS}
        disabled={disabled}
        required
      />
      <HistoryInput disabled={disabled} />

      <RadioFieldWithError
        field="hasChildren"
        label="Patient has children?"
        options={DOES_OPTIONS}
        disabled={disabled}
        required
      />
    </BlockHeading>
  )
}
export { History }
