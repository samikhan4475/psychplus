'use client'

import { Flex } from '@radix-ui/themes'
import { ClaimTable } from './components/claim-table'

const ClaimsTableWidgetClient = () => {
  return (
    <Flex direction="column" className="h-fit p-2">
      <ClaimTable />
    </Flex>
  )
}

export { ClaimsTableWidgetClient }
