'use client'

import { useEffect } from 'react'
import * as Tabs from '@radix-ui/react-tabs'
import { ScrollArea } from '@radix-ui/themes'
import { WidgetContainer } from '@/components'
import { Appointment } from '@/types'
import { cn } from '@/utils'
import { AddVitalsButton, PatientVital, useStore } from './vitals-widget'
import { AlertDialog } from './vitals-widget/alert-dialog'
import { VitalsHistoryButton } from './vitals-widget/buttons/history/history'
import { VitalsTable } from './vitals-widget/vitals-table'

const QuicknotesVitalsWidget = ({
  patientId,
  quicknoteData,
  appointment,
}: {
  patientId: string
  quicknoteData: PatientVital[]
  appointment?: Appointment
}) => {
  const { setAppointment } = useStore((state) => ({
    setAppointment: state.setAppointment,
  }))

  useEffect(() => {
    if (appointment) setAppointment(appointment)
  }, [appointment])

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
            quicknoteData && quicknoteData.length > 7 && 'pr-2.5',
          )}
        >
          <VitalsTable data={quicknoteData ?? []} editStatusCell={false} />
        </ScrollArea>
      </WidgetContainer>
      <AlertDialog />
    </Tabs.Root>
  )
}

export { QuicknotesVitalsWidget }
