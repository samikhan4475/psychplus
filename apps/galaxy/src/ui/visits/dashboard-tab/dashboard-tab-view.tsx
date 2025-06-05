'use client'

import * as Tabs from '@radix-ui/react-tabs'
import { Flex, Text } from '@radix-ui/themes'
import { XIcon } from 'lucide-react'
import { TabContentHeading } from '@/components'
import { AllVisit } from './all-visit/all-visit-tab'
import { VisitByState } from './visit-by-state/visit-by-state-tab'

const DashboardTabView = () => {
  return (
    <Tabs.Root defaultValue="AllVisits" className="flex w-full flex-col">
      <TabContentHeading title="Dashboard" className="justify-start gap-8">
        <Tabs.List asChild>
          <Flex gap="2">
            <TabsTrigger value="AllVisits">
              <Text>All Visits</Text>
            </TabsTrigger>
            <TabsTrigger value="VisitByState">
              <Text>Visit by State</Text>
            </TabsTrigger>
          </Flex>
        </Tabs.List>
      </TabContentHeading>

      <TabsContent value="AllVisits" className="pt-1">
        <AllVisit />
      </TabsContent>

      <TabsContent value="VisitByState" className="pt-1">
        <VisitByState />
      </TabsContent>
    </Tabs.Root>
  )
}

interface TabsTriggerProps {
  value: string
  children: React.ReactNode
  onClose?: () => void
}

const TabsTrigger = ({ value, children, onClose }: TabsTriggerProps) => (
  <Tabs.Trigger
    value={value}
    className="bg-white rounded-2 border border-accent-6 px-2 py-0.5 text-[12px] text-gray-12 first:border-l data-[state=active]:cursor-default data-[state=active]:border-gray-5 data-[state=active]:bg-accent-4 data-[state=active]:font-[500] data-[state=active]:text-accent-12"
  >
    <Flex align="center" gap="2">
      {children}
      {onClose ? (
        <Flex
          align="center"
          justify="center"
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
  className,
}: {
  value: string
  children: React.ReactNode
  className?: string
}) => {
  return (
    <Tabs.Content className={className} value={value}>
      {children}
    </Tabs.Content>
  )
}

export { DashboardTabView }
