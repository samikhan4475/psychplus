'use client'

import * as Tabs from '@radix-ui/react-tabs'
import { WidgetContainer } from '@/components'
import { AlertDialog } from './alert-dialog'
import { VitalsTabsContent } from './tabs'
import { VitalsFilterForm } from './vitals-filter-form'
import { VitalsHeader } from './vitals-header'

interface VitalsWidgetProps {
  patientId: string
}

const VitalsWidget = ({ patientId }: VitalsWidgetProps) => {
  return (
    <Tabs.Root defaultValue="SheetView">
      <VitalsHeader patientId={patientId} />

      <WidgetContainer title="">
        <VitalsFilterForm patientId={patientId} />

        <VitalsTabsContent
          patientId={patientId}
          handleQuicknotesLoading={true}
        />
        <AlertDialog />
      </WidgetContainer>
    </Tabs.Root>
  )
}

export { VitalsWidget }
