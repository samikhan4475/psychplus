import { ColumnHeader, DataTable, TextCell } from '@/components'
import { useHasPermission } from '@/hooks'
import { QuickNoteHistory } from '@/types'
import { PermissionAlert } from '@/ui/schedule/shared'
import { Box } from '@radix-ui/themes'
import { CellContext, ColumnDef, HeaderContext } from '@tanstack/react-table'
import { format } from 'date-fns'
import { useMemo, useState } from 'react'
import { useHpiHistoryStore } from './store'

interface Column {
  createdOn: string
  createdByFullName: string
}

const CreatedOnHeader = ({ column }: HeaderContext<Column, unknown>) => (
  <ColumnHeader label="Date/Time" clientSideSort column={column} />
)

const CreatedByHeader = ({ column }: HeaderContext<Column, unknown>) => (
  <ColumnHeader label="User" clientSideSort column={column} />
)

const CreatedOnCell = ({ row }: CellContext<Column, unknown>) => (
  <TextCell className="text-xs truncate leading-1">
    {format(new Date(row.original.createdOn), 'MM/dd/yy HH:mm')}
  </TextCell>
)

const CreatedByCell = ({ row }: CellContext<Column, unknown>) => (
  <TextCell className="text-xs truncate leading-1">
    {row.original.createdByFullName}
  </TextCell>
)

export const HpiHistoryTable = () => {
  const [openAlert, setOpenAlert] = useState(false)
  const { history, setSelectedHistory, selectedHistory } = useHpiHistoryStore() as {
    history: QuickNoteHistory[],
    setSelectedHistory: (history: QuickNoteHistory) => void,
    selectedHistory: QuickNoteHistory
  }
  const permission = useHasPermission('saveSelectedOptionsVisitViewTabs')

  const columns = useMemo<ColumnDef<Column>[]>(() => [
    {
      id: 'createdOn',
      accessorKey: 'createdOn',
      header: CreatedOnHeader,
      sortingFn: (a, b) =>
        new Date(a.original.createdOn).getTime() -
        new Date(b.original.createdOn).getTime(),
      cell: CreatedOnCell,
      enableHiding: true,
    },
    {
      id: 'createdByFullName',
      accessorKey: 'createdByFullName',
      header: CreatedByHeader,
      cell: CreatedByCell,
      enableHiding: false,
    },
  ], [])

  return (
    <>
      <Box className="h-full overflow-auto min-w-[200px]" maxHeight="70vh">
        <DataTable
          onRowClick={(row) => {
            if (!permission) {
              setOpenAlert(true)
              return
            }
            setSelectedHistory(row.original as QuickNoteHistory)
          }}
          tableClass="[&_.rt-ScrollAreaScrollbar]:!hidden"
          theadClass="z-10"
          disablePagination
          data={history}
          isRowSpan
          sticky
          defaultSorting={[{ id: 'createdOn', desc: true }]}
          columns={columns}
          isRowSelected={(row) =>
            selectedHistory?.createdOn === (row.original as QuickNoteHistory).createdOn
          }

        />
      </Box>

      <PermissionAlert
        isOpen={openAlert}
        onClose={() => setOpenAlert(false)}
        message="You do not have permission to Save. Please contact your supervisor if you need any further assistance."
      />
    </>
  )
}
