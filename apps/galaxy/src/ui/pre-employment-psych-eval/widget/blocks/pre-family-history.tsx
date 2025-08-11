'use client'

import { BlockHeading } from '@/ui/fit-for-duty-psych-eval/widget/block-heading'
import { DetailsField } from '@/ui/fit-for-duty-psych-eval/widget/components'
import { PRE_FAMILY_HISTORY_DETAIL } from '@/ui/fit-for-duty-psych-eval/widget/constant'
import { BlockProps } from '@/ui/fit-for-duty-psych-eval/widget/types'

const PreFamilyHistory = ({ disabled = false }: BlockProps) => {
  return (
    <BlockHeading title="Family History">
      <DetailsField
        field="familyHistoryDetails"
        label={PRE_FAMILY_HISTORY_DETAIL}
        maxLength={1200}
        disabled={disabled}
      />
    </BlockHeading>
  )
}
export { PreFamilyHistory }
