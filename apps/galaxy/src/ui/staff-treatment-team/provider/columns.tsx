import { Flex, Grid } from '@radix-ui/themes'
import { ColumnDef } from '@tanstack/react-table'
import { ColumnHeader, TextCell } from '@/components'
import { formatDate } from '@/utils'
import { PatientNameCell } from './cells/patient-name-cell'
import { RowActionView } from './cells/row-action-view'
import { StateNameCell } from './cells/state-name-cell'
import { TableHeaderCheckboxCell } from './cells/table-header-checkbox-cell'
import { TableRowCheckboxCell } from './cells/table-row-checkbox-cell'
import { Patient } from './types'
import { sortOnAddedOn } from './util'

const columns: (
  selectedRows: string[],
  onOpen: (patientId: number) => void,
) => ColumnDef<Patient>[] = (selectedRows, onOpen) => {
  return [
    {
      id: 'select',
      size: 20,
      header: ({ table }) => (
        <Flex className="justify-center">
          <TableHeaderCheckboxCell
            checked={table.getIsAllPageRowsSelected()}
            onCheckedChange={(val) => table.toggleAllPageRowsSelected(val)}
          />
        </Flex>
      ),
      cell: ({ row }) => (
        <Flex className="flex-1 justify-center">
          <TableRowCheckboxCell
            id={row.original.patientId}
            checked={selectedRows.includes(`${row.original.patientId}`)}
            onCheckedChange={(val) => row.toggleSelected(val)}
          />
        </Flex>
      ),
    },
    {
      id: 'patientName',
      accessorFn: (row) => row.patientName?.firstName,
      size: 50,
      header: ({ column }) => (
        <ColumnHeader column={column} clientSideSort label="Patient Name" />
      ),
      cell: PatientNameCell,
    },
    {
      id: 'patientState',
      accessorKey: 'patientState',
      size: 50,
      header: ({ column }) => (
        <ColumnHeader column={column} clientSideSort label="Resident State" />
      ),
      cell: StateNameCell,
    },
    {
      id: 'addedOn',
      accessorFn: (row) => row.addedOn,
      header: ({ column }) => (
        <ColumnHeader column={column} clientSideSort label="Added on" />
      ),
      cell: ({ row }) => (
        <Grid className="grid-cols-2 gap-1">
          <TextCell className="px-1">
            {formatDate(row.original?.addedOn, 'MM/dd/yy')}
          </TextCell>
          <TextCell className="px-1 text-gray-9">
            {formatDate(row.original?.addedOn, 'HH:mm')}
          </TextCell>
        </Grid>
      ),
      sortingFn: sortOnAddedOn,
    },
    {
      id: 'actions-column',
      size: 30,
      header: () => <ColumnHeader label="Actions" className="!font-medium" />,
      cell: ({ row }) => (
        <RowActionView patientId={row.original.patientId} onOpen={onOpen} />
      ),
    },
  ]
}

export { columns }
