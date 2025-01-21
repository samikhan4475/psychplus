'use client'

import * as Tabs from '@radix-ui/react-tabs'
import { Flex, Text } from '@radix-ui/themes'
import { XIcon } from 'lucide-react'
import { PatientCurrentMedicationTabView } from './patient-medications-widget/patient-current-medication-tab-view'

const AddMedication = () => {
  return (
    <>
      <Flex
        justify="between"
        align="center"
        p="2"
        className="bg-white relative -mt-[1px]"
        gap="2"
        direction="column"
      >
        <Flex className=" w-full">
          <Tabs.Root defaultValue="Current" className="flex w-full flex-col">
            <Flex>
              <Tabs.List>
                <TabsTrigger value="Current">Current</TabsTrigger>
              </Tabs.List>
              <Tabs.List>
                <TabsTrigger value="Home">Home</TabsTrigger>
              </Tabs.List>
              <Tabs.List>
                <TabsTrigger value="External">External</TabsTrigger>
              </Tabs.List>
              <Flex className="flex-1 border-b border-gray-5" />
            </Flex>

            <TabsContent value="Current">
              <PatientCurrentMedicationTabView />
            </TabsContent>

            <TabsContent value="Home">
              <PatientCurrentMedicationTabView />
            </TabsContent>
            <TabsContent value="External">
              <PatientCurrentMedicationTabView />
            </TabsContent>
          </Tabs.Root>
        </Flex>
      </Flex>
    </>
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
    className="bg-white border border-l-0 border-accent-6 border-b-gray-5 p-0 px-2 py-1 text-[12px] text-gray-12 first:border-l data-[state=active]:cursor-default data-[state=active]:border-gray-5 data-[state=active]:bg-accent-4 data-[state=active]:font-[600] data-[state=active]:text-accent-12"
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
  return <Tabs.Content value={value}>{children}</Tabs.Content>
}

export { AddMedication }
