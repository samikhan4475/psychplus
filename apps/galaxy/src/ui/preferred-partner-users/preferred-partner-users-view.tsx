'use client'

import React, { useState } from 'react'
import { useParams } from 'next/navigation'
import * as Tabs from '@radix-ui/react-tabs'
import { Flex } from '@radix-ui/themes'
import { XIcon } from 'lucide-react'
import { PreferredPartnerActiveUsersTab } from './preferred-partner-active-users-tab'
import { PreferredPartnerWorklistTab } from './preferred-partner-worklist-tab'

interface PreferredPartnerUsersViewProps {
  googleApiKey: string
}

const PreferredPartnerUsersView = ({ googleApiKey }: PreferredPartnerUsersViewProps) => {
  const { id } = useParams()
  const [activeTab, setActiveTab] = useState('active-users')

  const ppid = Array.isArray(id) ? id[0] : id

  return (
    <Flex 
      className="flex flex-1 flex-col" 
      direction="column"
    >
      <Tabs.Root
        className="flex w-full flex-col"
        value={activeTab}
        onValueChange={setActiveTab}
      >
        <Flex>
          <Tabs.List>
            <TabsTrigger value="active-users">
              Active Users
            </TabsTrigger>
            <TabsTrigger value="worklist">
              Worklist
            </TabsTrigger>
          </Tabs.List>
          <Flex className="flex-1 border-b border-gray-5" />
        </Flex>

        <TabsContent value="active-users">
          <PreferredPartnerActiveUsersTab ppid={ppid} googleApiKey={googleApiKey} />
        </TabsContent>

        <TabsContent value="worklist">
          <PreferredPartnerWorklistTab ppid={ppid} googleApiKey={googleApiKey} />
        </TabsContent>
      </Tabs.Root>
    </Flex>
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
    className="data-[state=active]:border-b-white data-[state=active]:bg-white border border-l-0 border-accent-6 border-b-gray-5 bg-accent-4 p-0 px-2 py-1 text-[12px] text-gray-12 first:border-l data-[state=active]:cursor-default data-[state=active]:border-gray-5 data-[state=active]:font-[600] data-[state=active]:text-accent-12"
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

export { PreferredPartnerUsersView }
