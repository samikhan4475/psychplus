'use client'

import { useEffect } from 'react'
import { useParams, useSearchParams } from 'next/navigation'
import { WidgetContainer } from '@/components'
import { AddLabOrdersButton } from './add-lab-orders-button'
import { LabOrderTablePagination } from './lab-order-pagination-table'
import { LabOrderTable } from './lab-order-table'
import { LabOrdersFilterForm } from './lab-orders-filter-form'
import { LabOrdersHeader } from './lab-orders-header'
import { useStore } from './store'

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
  const searchParams = useSearchParams()
  const { fetch, setAppointmentId } = useStore()
  const { id } = useParams<{ id: string }>()
  const appointmentId = searchParams.get('id') ?? '0'

  const fetchData = () => {
    setAppointmentId(appointmentId)
    const payload = {
      patientId: [id]
    }
    fetch(appointmentId, payload)
  }

  useEffect(() => {
    fetchData()
  }, [appointmentId, id])

  return (
    <>
      {IsLabOrderHeader && <LabOrdersHeader onRefresh={fetchData} />}

      <WidgetContainer
        title={!IsLabOrderHeader ? 'Lab Orders' : ''}
        headerRight={
          !IsLabOrderHeader ? (
            <AddLabOrdersButton onRefresh={fetchData} />
          ) : null
        }
      >
        {showFilters && <LabOrdersFilterForm />}
        <LabOrderTable />
        <LabOrderTablePagination />
      </WidgetContainer>
    </>
  )
}

export { LabOrdersWidget }
