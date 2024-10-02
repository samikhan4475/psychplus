'use client'

import { useEffect, useState } from 'react'
import * as Tabs from '@radix-ui/react-tabs'
import { Flex } from '@radix-ui/themes'
import { XIcon } from 'lucide-react'
import { SelectOptionType } from '@/types'
import { getStaffOptionsAction } from './actions'
import { BillingTab } from './billing-tab'
import { BILLING_TAB, TREATMENT_TAB } from './constants'
import { useStore } from './store'
import { TreatmentTab } from './treatment-tab'

interface StaffCommentsViewProps {
  patientId: string
}

const StaffCommentsView = ({ patientId }: StaffCommentsViewProps) => {
  const [staffOptions, setStaffOptions] = useState<SelectOptionType[]>([])
  const { activeTab, setActiveTab } = useStore((state) => ({
    activeTab: state.activeTab,
    setActiveTab: state.setActiveTab,
  }))

  useEffect(() => {
    getStaffOptionsAction().then((staffResult) => {
      if (staffResult.state === 'success') {
        setStaffOptions(staffResult.data ?? [])
      }
    })
  }, [])

  return (
    <Tabs.Root
      className="flex h-full w-full flex-col"
      value={activeTab}
      onValueChange={setActiveTab}
    >
      <Tabs.List>
        <TabsTrigger value={TREATMENT_TAB}>Treatment</TabsTrigger>
        <TabsTrigger value={BILLING_TAB}>Billing</TabsTrigger>
      </Tabs.List>
      <TabsContent value={TREATMENT_TAB}>
        <TreatmentTab patientId={patientId} staffOptions={staffOptions ?? []} />
      </TabsContent>
      <TabsContent value={BILLING_TAB}>
        <BillingTab patientId={patientId} staffOptions={staffOptions ?? []} />
      </TabsContent>
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
  const viewedTabs = useStore((state) => state.viewedTabs)

  return (
    <Tabs.Content
      value={value}
      forceMount={viewedTabs.has(value) ? true : undefined}
      className="hidden h-full flex-1 flex-col gap-0.5 px-[1px] pt-0.5 data-[state=active]:flex"
    >
      {children}
    </Tabs.Content>
  )
}

export { StaffCommentsView }
