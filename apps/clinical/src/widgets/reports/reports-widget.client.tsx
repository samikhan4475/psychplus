'use client'

import { useRef } from 'react'
import { Box, Flex } from '@radix-ui/themes'
import { Tabs } from '@psychplus/ui/tabs'
import { REPORTS_WIDGET } from '@psychplus/widgets'
import {
  usePublishLoaded,
  usePublishSize,
  useSubscribeClosePopover,
} from '@psychplus/widgets/hooks'
import { ToastProvider } from '@/providers'
import { ReportsContent } from './components'
import { useRefetchTemplates } from './hooks'
import { useStore } from './store'

const tabContentStyles = 'col-span-5 h-full'
const tabButtonClasses =
  'justify-start text-[#000000] text-[14px] data-[state=active]:font-[510] data-[state=active]:before:bg-transparent data-[state=active]:bg-[#0144FF26] truncate px-0.5 py-1 rounded-[4px]'

const ReportsWidgetClient = () => {
  const ref = useRef<HTMLDivElement>(null)
  const reportCategories = useStore((state) => state.reportCategories)

  usePublishLoaded(REPORTS_WIDGET)
  usePublishSize(REPORTS_WIDGET, ref)
  useSubscribeClosePopover(REPORTS_WIDGET)
  useRefetchTemplates()

  return (
    <ToastProvider>
      <Flex
        direction="column"
        className="box-border h-screen min-h-[600px] min-w-fit bg-[#DEE2EC]"
        ref={ref}
      >
        <Tabs.Root
          defaultValue="Patient"
          orientation="vertical"
          className="h-full"
        >
          <Box className="grid h-full grid-cols-6 gap-x-1">
            <Tabs.List className="col-span-1 flex h-full flex-col overflow-y-scroll bg-[#FFF] pl-3.5 pr-5 pt-2">
              {(reportCategories.codes ? reportCategories.codes : []).map(
                (tab) => (
                  <Tabs.Trigger
                    key={tab.code}
                    value={tab.code}
                    className={tabButtonClasses}
                  >
                    {tab.displayName}
                  </Tabs.Trigger>
                ),
              )}
            </Tabs.List>
            {(reportCategories.codes ? reportCategories.codes : []).map(
              (category) => (
                <Tabs.Content
                  key={`content-${category.code}`}
                  value={category.code}
                  className={tabContentStyles}
                >
                  <ReportsContent
                    category={category.code}
                    title={category.displayName}
                  />
                </Tabs.Content>
              ),
            )}
          </Box>
        </Tabs.Root>
      </Flex>
    </ToastProvider>
  )
}

export { ReportsWidgetClient }
