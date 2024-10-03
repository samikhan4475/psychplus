'use client'

import { useEffect, useState } from 'react'
import { Flex, ScrollArea } from '@radix-ui/themes'
import toast from 'react-hot-toast'
import { DataTable, LoadingPlaceholder } from '@/components'
import { Appointment } from '@/types'
import { getBookedAppointmentsAction } from '@/ui/schedule/actions'
import { columns } from '@/ui/schedule/list-view/table-columns'
import { AppointmentParams } from '@/ui/schedule/types'

interface ListViewTableProps {
  staffId: string
  startDate: string
  endDate: string
}

const ListViewTable = ({ staffId, startDate, endDate }: ListViewTableProps) => {
  const [tableData, setTableData] = useState<Appointment[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    const filters: AppointmentParams = {
      providerIds: [parseInt(staffId)],
      startingDate: startDate,
      endingDate: endDate,
    }
    setLoading(true)
    getBookedAppointmentsAction(filters).then((response) => {
      setLoading(false)
      if (response.state === 'error') {
        setTableData([])
        toast.error('Failed to retrieve appointments data')
      } else setTableData(response.data)
    })
  }, [])

  if (loading) return <LoadingPlaceholder className="bg-white min-h-[46vh]" />

  return (
    <Flex direction="column" className="flex-1">
      <ScrollArea className="mt-[13px] w-full" scrollbars="horizontal">
        <DataTable columns={columns} data={tableData} isRowSpan />
      </ScrollArea>
    </Flex>
  )
}

export { ListViewTable }
