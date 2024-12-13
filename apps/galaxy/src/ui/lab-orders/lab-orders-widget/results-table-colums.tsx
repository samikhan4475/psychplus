'use client'

import { ColumnDef } from '@tanstack/react-table'
import { ColumnHeader } from '@/components'
import { LabResult } from '@/types'
import {
  AbnormalFlagDropdown,
  CodefieldCell,
  LabResultStatusDropdown,
  NotesfieldCell,
  ObservationTimeFieldCell,
  RefRangefieldCell,
  ResultfieldCell,
  TestNameCell,
  UnitDropdown,
} from './cells'
import { ViewActionsCell } from './cells/view-action-cell'

const columns: ColumnDef<LabResult>[] = [
  {
    id: 'test-name',
    header: () => <ColumnHeader clientSideSort label="Test Name" />,
    cell: ({ row }) => <TestNameCell row={row} />,
  },
  {
    id: 'date-time',
    size: 200,
    header: () => <ColumnHeader clientSideSort label="Date/Time" />,
    cell: ({ row }) => <ObservationTimeFieldCell row={row} />,
    accessorKey: 'observationTime',
  },
  {
    id: 'result-value',
    header: () => <ColumnHeader clientSideSort label="Result" />,
    cell: ({ row }) => <ResultfieldCell row={row} />,
  },

  {
    id: 'unit',
    header: () => <ColumnHeader clientSideSort label="Unit" />,
    cell: ({ row }) => <UnitDropdown row={row} />,
  },
  {
    id: 'code',
    header: () => <ColumnHeader clientSideSort label="Code" />,
    cell: ({ row }) => <CodefieldCell row={row} />,
  },
  {
    id: 'ref-range',
    header: () => <ColumnHeader clientSideSort label="Ref. Range" />,
    cell: ({ row }) => <RefRangefieldCell row={row} />,
  },
  {
    id: 'flag',
    header: () => <ColumnHeader clientSideSort label="Flag" />,
    cell: ({ row }) => <AbnormalFlagDropdown row={row} />,
  },
  {
    id: 'status',
    header: () => <ColumnHeader clientSideSort label="Status" />,
    cell: ({ row }) => <LabResultStatusDropdown row={row} />,
  },
  {
    id: 'notes',
    header: () => <ColumnHeader clientSideSort label="Notes" />,
    cell: ({ row }) => <NotesfieldCell row={row} />,
  },
  {
    id: 'actions',
    size: 50,
    header: () => <ColumnHeader label="Actions" />,
    cell: ({ row }) => <ViewActionsCell row={row} />,
  },
]
export { columns }
