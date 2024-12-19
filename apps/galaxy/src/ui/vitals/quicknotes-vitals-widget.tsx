'use client'

import { useEffect } from 'react'
import * as Tabs from '@radix-ui/react-tabs'
import { ScrollArea } from '@radix-ui/themes'
import { WidgetContainer } from '@/components'
import { cn } from '@/utils'
import { AddVitalsButton, PatientVital, useStore } from './vitals-widget'
import { VitalsHistoryButton } from './vitals-widget/buttons/history/history'
import { VitalsTable } from './vitals-widget/vitals-table'

const QuicknotesVitalsWidget = ({
  patientId,
  data,
  quicknoteData,
}: {
  patientId: string
  data: PatientVital[]
  quicknoteData: PatientVital[]
}) => {
  const { setQuicknotesData, setData, quicknotesData } = useStore((state) => ({
    setQuicknotesData: state.setQuicknotesData,
    setData: state.setData,
    quicknotesData: state.quicknotesData,
  }))

  useEffect(() => {
    setData(
      data?.map((vital) => ({
        ...vital,
        addToNote: quicknoteData
          .map((quicknote) => String(quicknote.id))
          .includes(String(vital.id)),
      })),
    )
    setQuicknotesData(quicknoteData)
  }, [patientId, data, quicknoteData])

  return (
    <Tabs.Root defaultValue="SheetView" className="flex w-full flex-col">
      <WidgetContainer
        title="Vitals"
        headerRight={
          <>
            <AddVitalsButton title="Add" patientId={patientId} />
            <VitalsHistoryButton patientId={patientId} />
          </>
        }
      >
        <ScrollArea
          className={cn(
            'max-h-[200px] flex-1 overflow-y-auto',
            quicknotesData && quicknotesData.length > 7 && 'pr-2.5',
          )}
        >
          <VitalsTable data={quicknotesData ?? []} editStatusCell={false} />
        </ScrollArea>
      </WidgetContainer>
    </Tabs.Root>
  )
}

export { QuicknotesVitalsWidget }
