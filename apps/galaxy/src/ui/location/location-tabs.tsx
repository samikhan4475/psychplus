'use client'
import * as Tabs from '@radix-ui/react-tabs'
import { Box, Flex, Text } from '@radix-ui/themes'
import { TabsTrigger } from '@/components'
import { LocationView } from './location-view'

const LocationTabs = () => {
  return (
    <Box className="px-3 pt-4">
      <Tabs.Root
        defaultValue="location"
        className="flex w-full flex-col"
      >
        <Flex className="z-50 w-full bg-white mb-1">
          <Tabs.List>
            <TabsTrigger value="location">
              Location
            </TabsTrigger>
            <TabsTrigger value="service">
              Service
            </TabsTrigger>
          </Tabs.List>
        </Flex>
        <Tabs.Content value="location">
          <LocationView />
        </Tabs.Content>
        <Tabs.Content value="service">
          <Text>Service</Text>
        </Tabs.Content>
      </Tabs.Root>
    </Box>
  )
}

export { LocationTabs }
