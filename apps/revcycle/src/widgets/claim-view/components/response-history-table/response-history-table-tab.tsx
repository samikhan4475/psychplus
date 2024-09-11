'use client'

import { Flex } from '@radix-ui/themes'
import { ResponseHistoryTable } from './response-history-table'

const ResponseTableTab = () => {
  return (
    <Flex direction="column" className="h-fit p-2">
      <ResponseHistoryTable />
    </Flex>
  )
}

export { ResponseTableTab }
