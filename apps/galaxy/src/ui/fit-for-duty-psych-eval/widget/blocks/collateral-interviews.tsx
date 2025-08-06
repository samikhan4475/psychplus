'use client'

import { BlockHeading } from '../block-heading'
import { DetailsField } from '../components'
import { COLLATERAL_INTERVIEWS } from '../constant'
import { BlockProps } from '../types'

const CollateralInterviews = ({ disabled = false }: BlockProps) => {
  return (
    <BlockHeading title="Collateral Interviews">
      <DetailsField
        field="higherUpSummary"
        label={COLLATERAL_INTERVIEWS}
        maxLength={1500}
        disabled={disabled}
      />
    </BlockHeading>
  )
}
export { CollateralInterviews }
