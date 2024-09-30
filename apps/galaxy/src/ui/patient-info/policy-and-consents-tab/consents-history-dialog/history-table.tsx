'use client'

import { ColumnDef } from '@tanstack/react-table'
import { ColumnHeader, DataTable, TextCell } from '@/components'
import { type PatientConsent } from '@/types'
import { PolicyDescriptionCell, StatusCell } from '../cells'
import { ActionCell } from './cells'

const columns: ColumnDef<PatientConsent>[] = [
  {
    id: 'issuance-date',
    accessorKey: 'issuanceDate',
    header: () => <ColumnHeader label="Issuance Date" />,
    cell: ({ row }) => <TextCell>{row.original.issuanceDate}</TextCell>,
  },
  {
    id: 'signing-date',
    accessorKey: 'signingDate',
    header: () => <ColumnHeader label="Signing Date" />,
    cell: ({ row }) => <TextCell>{row.original.signingDate}</TextCell>,
  },
  {
    id: 'policy-description',
    accessorKey: 'policyDescription',
    header: () => <ColumnHeader label="Policy Description" />,
    cell: ({ row }) => <PolicyDescriptionCell row={row} />,
  },
  {
    id: 'status',
    accessorKey: 'status',
    header: () => <ColumnHeader label="Status" />,
    cell: ({ row }) => <StatusCell row={row} />,
  },
  {
    id: 'actions',
    accessorKey: 'actions',
    header: () => <ColumnHeader label="Actions" />,
    cell: ({ row }) => <ActionCell row={row} />,
  },
]

interface HistoryDataTableProps {
  consents: PatientConsent[]
}
const HistoryDataTable = ({ consents }: HistoryDataTableProps) => {
  return <DataTable columns={columns} data={consents} />
}
export { HistoryDataTable }
