'use client'

import { Flex, Text, Tooltip } from '@radix-ui/themes'
import { RefreshCcw } from 'lucide-react'
import { PropsWithRow } from '@/components'
import { Claim, InsurancePolicyPriority } from '@/types'
import { getExcludedPolicies } from './utils'

const RowActionResubmit = ({ row }: PropsWithRow<Claim>) => {
  const excludedOptions = [...getExcludedPolicies(row.original)]

  const allPolicyPrioritiesExcluded = [
    InsurancePolicyPriority.Primary,
    InsurancePolicyPriority.Secondary,
    InsurancePolicyPriority.Tertiary,
  ].every((priority) => excludedOptions.includes(priority))

  const allowedResubmit =
    row.original.claimStatusCode === 'NewCharge' || allPolicyPrioritiesExcluded
  return (
    <Tooltip
      delayDuration={250}
      side="top"
      align="center"
      hidden={!allowedResubmit}
      content="This claim is not eligible for re-submission."
    >
      <Flex
        align="center"
        gapX="2"
        onClick={(e) => allowedResubmit && e.preventDefault()}
        className={allowedResubmit ? 'cursor-not-allowed opacity-60' : ''}
      >
        <RefreshCcw width={16} height={16} />
        <Text size="2" className="text-black">
          Resubmit Claim
        </Text>
      </Flex>
    </Tooltip>
  )
}

export { RowActionResubmit }
