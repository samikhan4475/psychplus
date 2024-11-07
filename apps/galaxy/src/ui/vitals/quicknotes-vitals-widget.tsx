'use client'

import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import * as Tabs from '@radix-ui/react-tabs'
import { ScrollArea } from '@radix-ui/themes'
import { LoadingPlaceholder, WidgetContainer } from '@/components'
import { cn } from '@/utils'
import { AddVitalsButton, useStore } from './vitals-widget'
import { VitalsHistoryButton } from './vitals-widget/buttons/history/history'
import { VitalsTable } from './vitals-widget/vitals-table'

const QuicknotesVitalsWidget = ({ patientId }: { patientId: string }) => {
  const searchParams = useSearchParams()

  const { quicknotesData, fetch, loading } = useStore((state) => ({
    quicknotesData: state.quicknotesData,
    loading: state.quicknotesLoading,
    fetch: state.fetch,
  }))

  useEffect(() => {
    fetch({ appointmentId, patientId }, true, true)
  }, [])

  const appointmentId = searchParams.get('id') || '0'

  return (
    <Tabs.Root defaultValue="SheetView" className="flex w-full flex-col">
      <WidgetContainer
        title="Vitals"
        headerRight={
          <>
            <AddVitalsButton
              title="Add"
              patientId={patientId}
              appointmentId={appointmentId}
            />
            <VitalsHistoryButton
              patientId={patientId}
              appointmentId={appointmentId}
            />
          </>
        }
      >
        {loading ? (
          <LoadingPlaceholder />
        ) : (
          <ScrollArea
            className={cn(
              'max-h-[200px] flex-1 overflow-y-auto',
              quicknotesData && quicknotesData.length > 7 && 'pr-2.5',
            )}
          >
            <VitalsTable data={quicknotesData ?? []} editStatusCell={false} />
          </ScrollArea>
        )}
      </WidgetContainer>
    </Tabs.Root>
  )
}

export { QuicknotesVitalsWidget }
