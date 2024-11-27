'use client'

import { useState } from 'react'
import { TabsContent } from '@radix-ui/react-tabs'
import * as Tabs from '@radix-ui/react-tabs'
import { Box, Flex } from '@radix-ui/themes'
import { LabResultFilterForm } from './lab-result-filter-form'
import { LabResultHeader } from './lab-result-header'
import { LabResultTable } from './lab-result-table'

const LabResultWidget = () => {
  const [activeTab, setActiveTab] = useState('SheetView')
  return (
    <Flex
      direction="column"
      width="100%"
      className="bg-white h-[calc(100dvh_-_278px)] rounded-1 shadow-2"
    >
      <Flex gap="1" direction="column" mb="1">
        <LabResultHeader activeTab={activeTab} setActiveTab={setActiveTab} />
        <LabResultFilterForm />
      </Flex>

      <Tabs.Root value={activeTab} onValueChange={setActiveTab}>
        <TabsContent value="SheetView">
          {activeTab === 'SheetView' && <LabResultTable />}
        </TabsContent>
        <TabsContent value="DataView">
          {activeTab === 'DataView' && <Box>Will be next phase </Box>}
        </TabsContent>
      </Tabs.Root>
    </Flex>
  )
}

export { LabResultWidget }
