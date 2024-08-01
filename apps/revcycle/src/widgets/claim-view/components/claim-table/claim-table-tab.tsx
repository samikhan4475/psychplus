'use client'

import { Flex } from '@radix-ui/themes'
import { ClaimTable } from './claim-table'

const ClaimsTableTab = () => {
  return (
    <Flex direction="column" className="h-fit p-2">
      <ClaimTable />
    </Flex>
  )
}

export { ClaimsTableTab }
