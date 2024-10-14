'use client'

import { useEffect } from 'react'
import * as Tabs from '@radix-ui/react-tabs'
import { Flex } from '@radix-ui/themes'
import { XIcon } from 'lucide-react'
import { Diagnosis } from './diagnosis'
import { History } from './history'
import { useStore } from './store'

interface DiagnosisViewProps {
  patientId: string
}

const DiagnosisView = ({ patientId }: DiagnosisViewProps) => {
  const { fetchWorkingDiagnosis } = useStore()

  useEffect(() => {
    fetchWorkingDiagnosis(patientId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [patientId])

  return (
    <Tabs.Root defaultValue="Diagnosis" className="flex w-full flex-col">
      <Flex>
        <Tabs.List>
          <TabsTrigger value="Diagnosis">Diagnosis</TabsTrigger>
        </Tabs.List>
        <Tabs.List>
          <TabsTrigger value="History">History</TabsTrigger>
        </Tabs.List>
        <Flex className="flex-1 border-b border-gray-5" />
      </Flex>

      <TabsContent value="Diagnosis">
        <Diagnosis recommended={true} patientId={patientId} />
      </TabsContent>

      <TabsContent value="History">
        <History />
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
  return <Tabs.Content value={value}>{children}</Tabs.Content>
}

export { DiagnosisView }
