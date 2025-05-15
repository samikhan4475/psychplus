'use client'

import { useState } from 'react'
import { ScrollArea } from '@radix-ui/themes'
import { DataTable } from '@/components'
import { Appointment } from '@/types'
import { columns } from './columns'
import { useStore } from './store'
import { ViewVisitPopup } from './view-visit-popup'

const VisitTable = ({ staffId }: { staffId: string }) => {
  const [appointment, setAppointment] = useState<Appointment>()
  const [isOpen, setIsOpen] = useState(false)
  const { fetchVisitsList, payload, visitsData } = useStore((state) => ({
    fetchVisitsList: state.fetchVisitsList,
    payload: state.payload,
    visitsData: state.visitsData,
  }))
  const viewAppointment = (appointment: Appointment) => {
    setIsOpen(true)
    setAppointment(appointment)
  }
  const refetch = () => {
    fetchVisitsList(payload || { providerIds: [Number(staffId)] })
  }

  return (
    <ScrollArea className="bg-white min-h-[150px] max-w-[calc(100vw_-_198px)] p-2">
      {appointment && (
        <ViewVisitPopup
          appointment={appointment}
          isOpen={isOpen}
          onClose={() => {
            setIsOpen(false)
            setAppointment(undefined)
          }}
        />
      )}
      <DataTable
        columns={columns(viewAppointment, refetch)}
        data={visitsData?.visitsListData ?? []}
        tdClass="!p-0"
        isRowSpan
        sticky
        disablePagination
        tableRowClass="border-b border-red-200"
      />
    </ScrollArea>
  )
}

export { VisitTable }
