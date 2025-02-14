'use client'

import { Box, Flex } from '@radix-ui/themes'
import { ColumnDef } from '@tanstack/react-table'
import {
  ColumnHeader,
  LoadingPlaceholder,
  DataTable as Table,
  TextCell,
} from '@/components'
import { type PatientConsent } from '@/types'
import { PolicyDescriptionCell, StatusCell } from './cells'
import { ActionCell } from './cells/action-cell'
import { formatPolicyString } from './utils'

const columns: ColumnDef<PatientConsent>[] = [
  {
    id: 'policy-description',
    accessorKey: 'policyDescription',
    header: () => <ColumnHeader label="Policy Description" />,
    cell: ({ row }) => <PolicyDescriptionCell row={row} />,
  },
  {
    id: 'policy-type',
    accessorKey: 'type',
    header: () => <ColumnHeader label="Policy Type" />,
    cell: ({ row }) => (
      <TextCell>{formatPolicyString(row.original.type)}</TextCell>
    ),
  },
  {
    id: 'organization-practice',
    accessorKey: 'organizationPractice',
    header: () => <ColumnHeader label="Organization/Practice" />,
    cell: ({ row }) => <TextCell>{row.original.organizationPractice}</TextCell>,
  },
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

interface DataTableProps {
  consents: PatientConsent[]
  loading?: boolean
}
const DataTable = ({ consents, loading }: DataTableProps) => {
  if (loading) {
    return (
      <Flex height="45dvh" className="bg-white" align="center" justify="center">
        <LoadingPlaceholder />
      </Flex>
    )
  }

  return (
    <Box className="bg-white rounded-1 p-2">
      <Table columns={columns} data={consents} />
    </Box>
  )
}
export { DataTable }
