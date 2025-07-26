import { Box, Checkbox, Flex } from '@radix-ui/themes'
import { ColumnDef } from '@tanstack/react-table'
import { Minus } from 'lucide-react'
import { ColumnHeader, DataTable } from '@/components'
import { ServiceLabel } from './cells'
import { ServiceVisit } from './types'

interface AutoRebookingTableProps {
  data: ServiceVisit[]
  updateCheckboxState: (targetId: string, newChecked: boolean) => void
}

const createColumns = (
  updateFn: (targetId: string, newChecked: boolean) => void,
): ColumnDef<ServiceVisit>[] => [
  {
    id: 'label',
    accessorKey: 'label',
    header: ({ column }) => (
      <ColumnHeader
        clientSideSort
        column={column}
        label="Service/Visit types"
        className="pl-6"
      />
    ),
    cell: ({ row }) => <ServiceLabel row={row} />,
  },
  {
    id: 'checked',
    accessorKey: 'checked',
    header: ({ column }) => (
      <ColumnHeader clientSideSort column={column} label="Auto-Rebooking" />
    ),
    cell: ({ row }) => {
      const isParentRow =
        row.original.subRows && row.original.subRows.length > 0
      const indeterminate = isIndeterminate(row.original)

      return (
        <Flex justify="center">
          {isParentRow && indeterminate ? (
            <Box className="bg-white shadow-ss-gray rounded-2">
              <Minus color="black" size={16} />
            </Box>
          ) : (
            <Checkbox
              checked={row.original.checked}
              onCheckedChange={(checked) => {
                // Only allow interaction for child rows or fully checked/unchecked parent rows
                if (!isParentRow || !indeterminate) {
                  updateFn(row.original.id, checked as boolean)
                }
              }}
              className={`[&[data-state="checked"]:before]:bg-pp-blue `}
              disabled={isParentRow && indeterminate}
            />
          )}
        </Flex>
      )
    },
  },
]

const AutoRebookingTable = ({
  data,
  updateCheckboxState,
}: AutoRebookingTableProps) => {
  return (
    <Box className="bg-white p-4">
      <DataTable
        columns={createColumns(updateCheckboxState)}
        data={data}
        defaultExpanded={true}
        disablePagination={true}
        tRowClass="bg-white"
      />
    </Box>
  )
}

export { AutoRebookingTable }

const isIndeterminate = (row: ServiceVisit): boolean => {
  if (!row.subRows || row.subRows.length === 0) return false

  const checkedCount = row.subRows.filter((subRow) => subRow.checked).length
  return checkedCount > 0 && checkedCount < row.subRows.length
}
