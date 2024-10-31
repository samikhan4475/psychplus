import { useEffect } from 'react'
import * as Tabs from '@radix-ui/react-tabs'
import { Flex } from '@radix-ui/themes'
import { LoadingPlaceholder } from '@/components'
import { useStore } from '../store'
import { VitalsTable } from '../vitals-table'

const VitalsTabsContent = ({
  patientId,
  appointmentId,
  showAddToNote = false,
}: {
  patientId: string
  appointmentId: string
  showAddToNote?: boolean
}) => {
  const { data, fetch, loading } = useStore((state) => ({
    data: state.data,
    loading: state.loading,
    fetch: state.fetch,
  }))

  useEffect(() => {
    fetch({ appointmentId, patientId })
  }, [])

  if (loading) return <LoadingPlaceholder />

  return (
    <Flex>
      <TabsContent value="SheetView">
        <VitalsTable data={data ?? []} showAddToNote={showAddToNote} />
      </TabsContent>
      {/* <TabsContent value="DataView" /> */}
    </Flex>
  )
}

export const TabsContent = ({
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

export { VitalsTabsContent }
