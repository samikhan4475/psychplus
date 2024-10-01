'use client'

import { useEffect, useState } from 'react'
import { Flex, ScrollArea } from '@radix-ui/themes'
import { DataTable } from '@/components'
import { Appointment } from '@/types'
import { columns } from '@/ui/schedule/list-view/table-columns'

interface ListViewTableProps {
  staffId: string
  startDate: string
  endDate: string
}

const ListViewTable = ({ staffId, startDate, endDate }: ListViewTableProps) => {
  const [tableData, setTableData] = useState<Appointment[]>([])

  useEffect(() => {
    // @TODO: Fetch data
    setTableData([])
  }, [])

  return (
    <Flex direction="column" className="flex-1">
      <ScrollArea className="mt-[13px] w-full" scrollbars="horizontal">
        <DataTable columns={columns} data={tableData} isRowSpan />
      </ScrollArea>
    </Flex>
  )
}

export { ListViewTable }
