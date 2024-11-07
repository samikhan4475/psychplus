'use client'

import { useSearchParams } from 'next/navigation'
import * as Tabs from '@radix-ui/react-tabs'
import { WidgetContainer } from '@/components'
import { VitalsTabsContent } from './tabs'
import { VitalsFilterForm } from './vitals-filter-form'
import { VitalsHeader } from './vitals-header'

interface VitalsWidgetProps {
  patientId: string
}

const VitalsWidget = ({ patientId }: VitalsWidgetProps) => {
  const searchParams = useSearchParams()

  const appointmentId = searchParams.get('id') || '0'

  return (
    <Tabs.Root defaultValue="SheetView">
      <VitalsHeader patientId={patientId} appointmentId={appointmentId} />

      <WidgetContainer title="">
        <VitalsFilterForm patientId={patientId} appointmentId={appointmentId} />

        <VitalsTabsContent
          patientId={patientId}
          appointmentId={appointmentId}
          handleQuicknotesLoading={true}
        />
      </WidgetContainer>
    </Tabs.Root>
  )
}

export { VitalsWidget }
