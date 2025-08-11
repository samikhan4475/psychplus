'use client'

import { BlockHeading } from '@/ui/fit-for-duty-psych-eval/widget/block-heading'
import { RadioFieldWithError } from '@/ui/fit-for-duty-psych-eval/widget/components'
import { BE_OPTIONS } from '@/ui/fit-for-duty-psych-eval/widget/constant'
import { BlockProps } from '@/ui/fit-for-duty-psych-eval/widget/types'

const PreHealth = ({ disabled = false }: BlockProps) => {
  return (
    <BlockHeading title="Health">
      <RadioFieldWithError
        label="Patient appears to be adequately adjusted socially, both in terms of family history, and recent and remote personal history."
        field="socialAdjustment"
        options={BE_OPTIONS}
        disabled={disabled}
        required
      />
    </BlockHeading>
  )
}
export { PreHealth }
