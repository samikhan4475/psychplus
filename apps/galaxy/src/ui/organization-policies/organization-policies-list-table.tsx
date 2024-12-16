'use client'

import {
  ColumnHeader,
  DataTable,
  DateCell,
  TextCell
} from '@/components'
import { formatDate } from '@/utils'
import { Box, ScrollArea } from '@radix-ui/themes'
import { type ColumnDef } from '@tanstack/react-table'
import { ActionsCell } from './cells'
import { Policy } from './types'

const columns: ColumnDef<Policy>[] =
  [
    {
      id: 'insuranceDate',
      header: ({ column }) => (
        <ColumnHeader
          label="Insurance Date"
          sortable
        />
      ),
      cell: ({ row }) => (
        <DateCell>
          {formatDate(`${row.original.insuranceDate}`, 'MM/dd/yyyy')}
        </DateCell>
      ),
    },
    {
      id: 'policyName',
      header: ({ column }) => (
        <ColumnHeader
          label="Policy Name"
          sortable
        />
      ),
      cell: ({ row }) => <TextCell>{row.original.policyName}</TextCell>,
    },
    {
      id: 'policy',
      header: ({ column }) => (
        <ColumnHeader
          label="Policy"
          sortable
        />
      ),
      cell: ({ row }) => <TextCell>{row.original.policy}</TextCell>,
    },
    {
      id: 'policyId',
      header: ({ column }) => (
        <ColumnHeader
          label="Policy ID"
          sortable
        />
      ),
      cell: ({ row }) => <TextCell>{row.original.policyId}</TextCell>,
    },
    {
      id: 'signingDate',
      header: ({ column }) => (
        <ColumnHeader
          label="Signing Date"
          sortable
        />
      ),
      cell: ({ row }) => (
        <DateCell>
          {formatDate(`${row.original.signingDate}`, 'MM/dd/yyyy')}
        </DateCell>
      ),
    },
    {
      id: 'status',
      header: ({ column }) => (
        <ColumnHeader
          label="Status"
          sortable
        />
      ),
      cell: ({ row }) => <TextCell>{row.original.status}</TextCell>,
    },
    {
      id: 'practice',
      header: ({ column }) => (
        <ColumnHeader
          label="Practice"
          sortable
        />
      ),
      cell: ({ row }) => <TextCell>{row.original.practice}</TextCell>,
    },
    {
      id: 'organization',
      header: ({ column }) => (
        <ColumnHeader
          label="Organization"
          sortable
        />
      ),
      cell: ({ row }) => <TextCell>{row.original.organization}</TextCell>,
    },
    {
      id: 'actions',
      header: () => <ColumnHeader label="Actions" className='min-w-[140px]' />,
      cell: ActionsCell,
    },
  ]

// Will be removed in next integration ticket
const dummyData = [
  {
    type: "Health",
    insuranceDate: "12/03/2024",
    status: "Active",
    policyName: "Comprehensive Health Plan",
    policy: "Policy123",
    policyId: "P12345",
    signingDate: "12/03/2024",
    practice: "General Practice",
    organization: "HealthCare Inc.",
  },
  {
    type: "Life",
    insuranceDate: "12/03/2024",
    status: "Pending",
    policyName: "Life Insurance Gold",
    policy: "Policy456",
    policyId: "P67890",
    signingDate: "12/03/2024",
    practice: "Life Care Practice",
    organization: "LifeSecure Ltd.",
  },
  {
    type: "Vehicle",
    insuranceDate: "12/03/2024",
    status: "Expired",
    policyName: "Vehicle Protection Plus",
    policy: "Policy789",
    policyId: "P11223",
    signingDate: "12/03/2024",
    practice: "Auto Insurance",
    organization: "DriveSafe Corp.",
  },
];

const OrganizationPoliciesListTable = () => {
  return (
    <Box className='bg-white rounded p-1 my-1'>
      <ScrollArea className='p-1 rounded'>
        <DataTable
          data={dummyData}
          columns={columns}
          disablePagination
          sticky
        />
      </ScrollArea>
    </Box>
  )
}

export { OrganizationPoliciesListTable }

