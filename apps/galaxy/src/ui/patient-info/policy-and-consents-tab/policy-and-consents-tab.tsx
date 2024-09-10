'use client'

import { Flex, ScrollArea } from '@radix-ui/themes'
import { TabContentHeading } from '../shared'
import { DataTable } from './data-table'

const TAB_TITLE = 'Policy and Consents'

const PolicyAndConsentsTab = () => {
  return (
    <Flex direction="column" width="100%" className="gap-0.5">
      <TabContentHeading title={TAB_TITLE} />
      <ScrollArea>
        <DataTable />
      </ScrollArea>
    </Flex>
  )
}

export { PolicyAndConsentsTab }
