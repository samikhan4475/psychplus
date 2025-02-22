'use client'

import * as Tabs from '@radix-ui/react-tabs'
import { Box, Flex } from '@radix-ui/themes'
import { TabsTrigger } from '@/components'
import { LocationView } from './location-tab'
import { ServiceView } from './service'

interface LocationTabsProps {
  googleApiKey: string
}

const LocationTabs = ({ googleApiKey }: LocationTabsProps) => {
  return (
    <Box width="100%" height="100%">
      <Tabs.Root
        defaultValue="location"
        className="flex h-full w-full flex-col"
      >
        <Flex className="z-50 mb-1 w-full">
          <Tabs.List>
            <TabsTrigger value="location">Location</TabsTrigger>
            <TabsTrigger value="service">Service</TabsTrigger>
          </Tabs.List>
        </Flex>
        <Tabs.Content value="location">
          <LocationView googleApiKey={googleApiKey} />
        </Tabs.Content>
        <Tabs.Content value="service">
          <ServiceView />
        </Tabs.Content>
      </Tabs.Root>
    </Box>
  )
}

export { LocationTabs }
