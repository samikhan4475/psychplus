'use client'

import { useEffect } from 'react'
import { useParams, useSearchParams } from 'next/navigation'
import { WidgetContainer } from '@/components'
import { genericEventBus } from '@/lib/generic-event-bus'
import { GenericPayload } from '@/types'
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
  isQuickNoteView?: boolean
}
const LabOrdersWidget = ({
  IsLabOrderHeader = false,
  showFilters = false,
  isQuickNoteView = true,
}: LabOrderHeaderProps) => {
  const searchParams = useSearchParams()
  const { fetch, setAppointmentId, setIsQuickNoteView } = useStore()
  const { id } = useParams<{ id: string }>()
  const appointmentId = searchParams.get('id') ?? '0'

  const fetchData = () => {
    setIsQuickNoteView(isQuickNoteView)
    setAppointmentId(appointmentId)
    const payload = {
      patientId: [id],
    }
    fetch(appointmentId, payload)
  }

  useEffect(() => {
    fetchData()
  }, [appointmentId, id])

  useEffect(() => {
    if (!isQuickNoteView) return

    const handleEvent = (event?: GenericPayload) => {
      if (event?.type === 'lab-order') {
        fetchData()
      }
    }

    const eventKey = `${appointmentId}`
    genericEventBus.on(eventKey, handleEvent)

    return () => {
      genericEventBus.off(eventKey, handleEvent)
    }
  }, [appointmentId, isQuickNoteView])

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
