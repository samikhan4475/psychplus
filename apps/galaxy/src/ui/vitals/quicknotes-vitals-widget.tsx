'use client'

import * as Tabs from '@radix-ui/react-tabs'
import { ScrollArea } from '@radix-ui/themes'
import { WidgetContainer } from '@/components'
import { cn } from '@/utils'
import { AddVitalsButton, PatientVital } from './vitals-widget'
import { VitalsHistoryButton } from './vitals-widget/buttons/history/history'
import { VitalsTable } from './vitals-widget/vitals-table'

const QuicknotesVitalsWidget = ({
  patientId,
  quicknoteData,
}: {
  patientId: string
  quicknoteData: PatientVital[]
}) => {
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
    </Tabs.Root>
  )
}

export { QuicknotesVitalsWidget }
