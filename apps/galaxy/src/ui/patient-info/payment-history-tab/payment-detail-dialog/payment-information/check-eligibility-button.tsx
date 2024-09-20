'use client'

import { Button } from '@radix-ui/themes'
import { RefreshLineIcon } from '@/components/icons'

const CheckEligibilityButton = () => {
  return (
    <Button
      size="1"
      variant="outline"
      color="gray"
      className="border-pp-gray-2 text-black border border-solid text-1 font-medium !outline-none [box-shadow:none]"
    >
      <RefreshLineIcon />
      Check Eligibility
    </Button>
  )
}

export { CheckEligibilityButton }
