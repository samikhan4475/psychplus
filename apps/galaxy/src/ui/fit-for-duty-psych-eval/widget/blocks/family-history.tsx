'use client'

import { BlockHeading } from '../block-heading'
import { DetailsField } from '../components'
import { FAMILY_HISTORY_DETAIL } from '../constant'
import { BlockProps } from '../types'

const FamilyHistory = ({ disabled = false }: BlockProps) => {
  return (
    <BlockHeading title="Family History">
      <DetailsField
        field="familyHistoryDetails"
        label={FAMILY_HISTORY_DETAIL}
        maxLength={1200}
        disabled={disabled}
      />
    </BlockHeading>
  )
}
export { FamilyHistory }
