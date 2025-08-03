'use client'

import { useState } from 'react'
import { Box } from '@radix-ui/themes'
import { ColumnDef, Row, Table } from '@tanstack/react-table'
import { ColumnHeader, DataTable, TextCell } from '@/components'
import { useHasPermission } from '@/hooks'
import { QuickNoteHistory } from '@/types'
import { PermissionAlert } from '@/ui/schedule/shared'
import { formatDateTime } from '@/utils'
import { useStore } from './store'

const columns: ColumnDef<QuickNoteHistory>[] = [
  {
    id: 'createdOn',
    accessorKey: 'createdOn',
    sortingFn: (a, b) =>
      new Date(a.original.createdOn).getTime() -
      new Date(b.original.createdOn).getTime(),
    header: ({ column }) => (
      <ColumnHeader label="Date/time" sortable clientSideSort column={column} />
    ),
    cell: ({ row }) => (
      <TextCell className="text-xs truncate leading-1">
        {formatDateTime(row?.original?.createdOn, false)}
      </TextCell>
    ),
  },
  {
    id: 'createdByFullName',
    accessorKey: 'createdByFullName',
    header: ({ column }) => (
      <ColumnHeader sortable clientSideSort column={column} label="User" />
    ),
    cell: ({ row }) => (
      <TextCell className="text-xs truncate leading-1">
        {row.original.createdByFullName ?? 'N/A'}
      </TextCell>
    ),
  },
]

const LabAndOrdersHistoryTable = () => {
  const [openAlert, setOpenAlert] = useState(false)
  const permission = useHasPermission('saveSelectedOptionsVisitViewTabs')
  const { setSelectedRow, labAndOrdersHistory } = useStore((state) => ({
    setSelectedRow: state.setSelectedRow,
    labAndOrdersHistory: state.labAndOrdersHistory,
  }))

  const onRowSelect = (
    row: Row<QuickNoteHistory>,
    table: Table<QuickNoteHistory>,
  ) => {
    table.setRowSelection({ [row.id]: true })
    setSelectedRow(row.original)
  }

  return (
    <>
      <Box className="h-full min-w-[200px] overflow-auto" maxHeight="70vh">
        <DataTable
          onRowClick={(row, table) => {
            if (!permission) {
              setOpenAlert(true)
              return
            }
            onRowSelect(row, table)
          }}
          tableClass="[&_.rt-ScrollAreaScrollbar]:!hidden"
          theadClass="z-10"
          disablePagination
          data={labAndOrdersHistory ?? []}
          isRowSpan
          selectFirstRow={true}
          sticky
          defaultSorting={[{ id: 'createdOn', desc: true }]}
          columns={columns}
        />
      </Box>

      <PermissionAlert
        isOpen={openAlert}
        onClose={() => setOpenAlert(false)}
        message="You do not have permission to click on the User Name in the history tab. Please contact your supervisor if you need any further assistance."
      />
    </>
  )
}

export { LabAndOrdersHistoryTable }
