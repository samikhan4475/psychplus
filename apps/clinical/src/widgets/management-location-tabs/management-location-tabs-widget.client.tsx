'use client'

import { useRef } from 'react'
import { Flex, Tabs } from '@radix-ui/themes'
import { cn } from '@psychplus/ui/cn'
import { ToastProvider } from '@psychplus/ui/toast-provider'
import { MANAGEMENT_LOCATION_TABS_WIDGET } from '@psychplus/widgets'
import { usePublishLoaded, usePublishSize } from '@psychplus/widgets/hooks'
import { ManagementLocationsWidgetClient } from '../management-locations'
import { ManagementServicesListWidgetClient } from '../management-services-list'

const tabButtonClasses =
  'text-[15px] text-[#000] data-[state=active]:font-[510] border-[1px] border-solid border-[#7894ed] border-b-0 bg-[#D9E2FC] data-[state=active]:bg-[#fff] data-[state=active]:before:bg-[#fff] h-[40]'
const ManagementLocationTabsWidgetClient = () => {
  const ref = useRef<HTMLDivElement>(null)

  usePublishLoaded(MANAGEMENT_LOCATION_TABS_WIDGET)
  usePublishSize(MANAGEMENT_LOCATION_TABS_WIDGET, ref)

  return (
    <ToastProvider>
      <Flex direction="column" className="h-fit min-w-fit" ref={ref}>
        <Tabs.Root defaultValue="location">
          <Tabs.List className="[shadow-none] bg-[#F0F4FF]">
            <Tabs.Trigger
              className={cn(
                'rounded-tl-2 [&__span]:hover:!bg-transparent',
                tabButtonClasses,
              )}
              value="location"
            >
              Location
            </Tabs.Trigger>
            <Tabs.Trigger
              className={cn(
                '[&__span]:hover:!bg-transparent',
                tabButtonClasses,
              )}
              value="service"
            >
              Service
            </Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="location">
            <ManagementLocationsWidgetClient />
          </Tabs.Content>
          <Tabs.Content value="service">
            <ManagementServicesListWidgetClient />
          </Tabs.Content>
        </Tabs.Root>
      </Flex>
    </ToastProvider>
  )
}

export { ManagementLocationTabsWidgetClient }
