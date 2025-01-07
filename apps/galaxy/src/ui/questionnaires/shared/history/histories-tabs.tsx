'use client'

import { useEffect, useRef } from 'react'
import * as Tabs from '@radix-ui/react-tabs'
import { Flex, ScrollArea } from '@radix-ui/themes'
import { format } from 'date-fns'
import { XIcon } from 'lucide-react'
import { QuickNoteHistory } from '@/types'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { QuestionnaireDetailView } from '../view/questionnaires-view-common'

interface HistoriesTabsProps {
  sectionName: QuickNoteSectionName
  data: QuickNoteHistory[]
  defaultTab?: string
}

const HistoriesTabs = ({
  sectionName,
  data,
  defaultTab,
}: HistoriesTabsProps) => {
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (defaultTab && scrollAreaRef.current) {
      const tabElement = scrollAreaRef.current.querySelector(
        `[data-value="${defaultTab}"]`,
      )
      if (tabElement) {
        scrollAreaRef.current.scrollLeft = (
          tabElement as HTMLElement
        ).offsetLeft
      }
    }
  }, [defaultTab])

  return (
    <Tabs.Root
      className="mt-3 flex max-w-screen-md flex-col"
      defaultValue={defaultTab}
    >
      <Tabs.List>
        <ScrollArea className="flex-1" ref={scrollAreaRef}>
          <Flex width="100%" pb="4">
            {Array.from(data).map((tab, index) => (
              <TabsTrigger
                key={`${tab.createdOn}-${index}`}
                value={tab.createdOn}
              >
                <Flex width="130px" justify="center" align="center">
                  {format(new Date(tab.createdOn), 'MM/dd/yyyy HH:mm:ss')}{' '}
                </Flex>
              </TabsTrigger>
            ))}
          </Flex>
        </ScrollArea>
      </Tabs.List>
      {Array.from(data).map((tab, index) => {
        const history = data.find((d) => d.createdOn === tab.createdOn)
        if (!history) return null
        return (
          <TabsContent key={`${tab.createdOn}-${index}`} value={tab.createdOn}>
            <Flex overflow="hidden">
              <QuestionnaireDetailView
                data={history?.data}
                sectionName={sectionName}
              />
            </Flex>
          </TabsContent>
        )
      })}
    </Tabs.Root>
  )
}

const TabsTrigger = ({
  value,
  children,
  onClose,
}: {
  value: string
  children: React.ReactNode
  onClose?: () => void
}) => (
  <Tabs.Trigger
    value={value}
    className="data-[state=active]:border-pp-gray-5 data-[state=active]:bg-pp-table-border bg-white mr-1 rounded-6  border border-accent-6 px-4 text-[12px] data-[state=active]:font-[600] data-[state=active]:text-accent-12"
    data-value={value}
  >
    <Flex align="center" gap="2">
      {children}
      {onClose ? (
        <Flex
          align="center"
          justify="center"
          className="rounded-full hover:text-black h-[18px] w-[18px] cursor-pointer text-gray-11 transition-colors hover:bg-gray-3"
          onPointerDown={(e) => {
            e.preventDefault()
          }}
          onClick={onClose}
        >
          <XIcon width={14} height={14} strokeWidth={1.5} />
        </Flex>
      ) : null}
    </Flex>
  </Tabs.Trigger>
)

const TabsContent = ({
  value,
  children,
}: {
  value: string
  children: React.ReactNode
}) => {
  return (
    <Tabs.Content
      value={value}
      className="hidden flex-1 flex-col gap-2 overflow-auto data-[state=active]:flex"
    >
      {children}
    </Tabs.Content>
  )
}

export { HistoriesTabs }
