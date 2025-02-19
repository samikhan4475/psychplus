'use client'

import { useEffect, useState } from 'react'
import { Flex, ScrollArea } from '@radix-ui/themes'
import { Row } from '@tanstack/react-table'
import { DataTable, LoadingPlaceholder } from '@/components'
import { Appointment } from '@/types'
import { sanitizeFormData } from '@/utils'
import { ActiveVisitTablePagination } from './active-visit-table-pagination'
import { columns } from './columns'
import { DeleteButton } from './delete-button'
import { useStore } from './store'
import { ActiveVisitFilters, AppointmentStatus } from './types'

interface ActiveVisitTableProps {
  filters: ActiveVisitFilters
}
const ActiveVisitTable = ({ filters }: ActiveVisitTableProps) => {
  const [selectedRows, setSelectedRows] = useState<Row<Appointment>[]>([])
  const { loading, visits, fetchVisits, refetch } = useStore((state) => ({
    loading: state.loading,
    visits: state.visits,
    fetchVisits: state.fetchVisits,
    refetch: state.refetch,
  }))
  useEffect(() => {
    fetchVisits(
      sanitizeFormData({
        providerIds: [Number(filters?.staffId)],
        startingDate: filters?.startDateTime,
        endingDate: filters?.endDateTime,
        appointmentStatus: AppointmentStatus.Scheduled,
      }),
    )
  }, [fetchVisits, filters])

  return (
    <>
      {loading ? (
        <LoadingPlaceholder className="h-full" />
      ) : (
        <ScrollArea scrollbars="both" className="h-full">
          <DataTable
            columns={columns}
            data={visits ?? []}
            sticky
            tableClass="bg-white"
            theadClass="z-[1]"
            onRowSelectionChange={setSelectedRows}
          />
        </ScrollArea>
      )}
      <Flex
        justify="between"
        align="center"
        className="border-pp-gray-2 border-t"
      >
        <DeleteButton
          selectedVisits={selectedRows}
          onDelete={() => {
            setSelectedRows([])
            refetch()
          }}
        />
        <ActiveVisitTablePagination />
      </Flex>
    </>
  )
}

export { ActiveVisitTable }
