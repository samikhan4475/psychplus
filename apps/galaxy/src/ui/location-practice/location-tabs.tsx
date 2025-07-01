'use client'

import * as Tabs from '@radix-ui/react-tabs'
import { Box, Flex } from '@radix-ui/themes'
import { TabsTrigger } from '@/components'
import { InstitutionalView } from './institutional-practices'
import { ProfessionalView } from './professional-practices'
import { LocationPracticeTab } from './types'

const LocationPracticeTabs = () => {
  return (
    <Box width="100%" height="100%">
      <Tabs.Root
        defaultValue={LocationPracticeTab.Institutional}
        className="flex h-full w-full flex-col"
      >
        <Flex className="z-50 mb-1 w-full">
          <Tabs.List>
            <TabsTrigger value={LocationPracticeTab.Institutional}>
              Institutional practice
            </TabsTrigger>
            <TabsTrigger value={LocationPracticeTab.Professional}>
              Professional practice
            </TabsTrigger>
          </Tabs.List>
        </Flex>
        <Tabs.Content value={LocationPracticeTab.Institutional}>
          <InstitutionalView />
        </Tabs.Content>
        <Tabs.Content value={LocationPracticeTab.Professional}>
          <ProfessionalView />
        </Tabs.Content>
      </Tabs.Root>
    </Box>
  )
}

export { LocationPracticeTabs }
