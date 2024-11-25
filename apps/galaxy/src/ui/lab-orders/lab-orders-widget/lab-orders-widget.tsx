'use client'

import { WidgetContainer } from '@/components'
import { AddLabOrdersButton } from './add-lab-orders-button'
import { LabOrderTable } from './lab-order-table'
import { LabOrdersFilterForm } from './lab-orders-filter-form'
import { LabOrdersHeader } from './lab-orders-header'

interface LabOrderHeaderProps {
  IsLabOrderHeader: boolean
}
const LabOrdersWidget = ({ IsLabOrderHeader }: LabOrderHeaderProps) => {
  return (
    <>
      {IsLabOrderHeader && <LabOrdersHeader />}

      <WidgetContainer
        title={!IsLabOrderHeader ? 'Lab Orders' : ''}
        headerRight={!IsLabOrderHeader ? <AddLabOrdersButton /> : null}
      >
        <LabOrdersFilterForm />
        <LabOrderTable />
      </WidgetContainer>
    </>
  )
}

export { LabOrdersWidget }
