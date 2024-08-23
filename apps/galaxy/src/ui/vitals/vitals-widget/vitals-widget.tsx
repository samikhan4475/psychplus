'use client'

import {
  WidgetClearButton,
  WidgetContainer,
  WidgetHxButton,
} from '@/components'
import { AddVitalsButton } from './add-vitals-button'
import { StoreProvider } from './store'
import { VitalsTable } from './vitals-table'

interface VitalsWidgetProps {
  patientId: string
}

const VitalsWidget = ({ patientId }: VitalsWidgetProps) => {
  return (
    <StoreProvider patientId={patientId}>
      <WidgetContainer
        title="Vitals"
        headerRight={
          <>
            <AddVitalsButton />
            <WidgetHxButton />
            <WidgetClearButton />
          </>
        }
      >
        <VitalsTable />
      </WidgetContainer>
    </StoreProvider>
  )
}

export { VitalsWidget }
