'use client'

import { WidgetContainer } from '@/components'
import { AddLabOrdersButton } from './add-lab-orders-button'
import { LabOrderTablePagination } from './lab-order-pagination-table'
import { LabOrderTable } from './lab-order-table'
import { LabOrdersFilterForm } from './lab-orders-filter-form'
import { LabOrdersHeader } from './lab-orders-header'

interface LabOrderHeaderProps {
  IsLabOrderHeader?: boolean
  patientId?: string
  appointmentId?: string
  showFilters?: boolean
}
const LabOrdersWidget = ({
  IsLabOrderHeader = false,
  showFilters = false,
}: LabOrderHeaderProps) => {
  return (
    <>
      {IsLabOrderHeader && <LabOrdersHeader />}

      <WidgetContainer
        title={!IsLabOrderHeader ? 'Lab Orders' : ''}
        headerRight={!IsLabOrderHeader ? <AddLabOrdersButton /> : null}
      >
        {showFilters && <LabOrdersFilterForm />}
        <LabOrderTable />
        <LabOrderTablePagination />
      </WidgetContainer>
    </>
  )
}

export { LabOrdersWidget }
