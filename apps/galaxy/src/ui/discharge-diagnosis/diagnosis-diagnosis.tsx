'use client'

import { PropsWithChildren, useEffect } from 'react'
import * as Tabs from '@radix-ui/react-tabs'
import { Flex, Text } from '@radix-ui/themes'
import { XIcon } from 'lucide-react'
import { DiagnosisList } from './diagnosis-list'
import { FavouriteDiagnosis } from './favourite-diagnosis'
import { useStore } from './store'

interface DiagnosisViewProps {
  patientId: string
  appointmentId: string
}

const DiagnosisView = ({ patientId, appointmentId }: DiagnosisViewProps) => {
  const { fetchDiagnosis, fetchFavouriteDiagnosis } = useStore((state) => ({
    fetchDiagnosis: state.fetchDiagnosis,
    fetchFavouriteDiagnosis: state.fetchFavouriteDiagnosis,
  }))

  useEffect(() => {
    Promise.all([
      fetchDiagnosis(patientId, appointmentId),
      fetchFavouriteDiagnosis(),
    ])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [patientId, appointmentId])

  return (
    <Tabs.Root defaultValue="Diagnosis" className="flex w-full flex-col">
      <Flex>
        <Tabs.List>
          <TabsTrigger value="Diagnosis">Discharge Diagnosis</TabsTrigger>
        </Tabs.List>
        <Flex className="flex-1 border-b border-gray-5" />
      </Flex>
      <TabsContent value="Diagnosis">
        <Flex className="bg-whiteA-12" gap="2">
          <Flex width="70%" direction="column">
            <Text className="bg-pp-bg-table-label px-2 py-1 font-bold">
              Working Discharge Diagnosis
            </Text>
            <DiagnosisList />
          </Flex>
          <Flex width="30%" direction="column">
            <FavouriteDiagnosis />
          </Flex>
        </Flex>
      </TabsContent>
    </Tabs.Root>
  )
}

const TabsTrigger = ({
  value,
  children,
  onClose,
}: PropsWithChildren<{ onClose?: () => void; value: string }>) => (
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
          onClick={onClose}
          onPointerDown={(e) => e.preventDefault()}
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
}: PropsWithChildren<{ value: string }>) => {
  return <Tabs.Content value={value}>{children}</Tabs.Content>
}

export { DiagnosisView }
