'use client'

import {
  ColumnHeader,
  DataTable,
  TextCell
} from '@/components'
import { Box, ScrollArea } from '@radix-ui/themes'
import { type ColumnDef } from '@tanstack/react-table'
import { ActionsCell } from './cells'
import { SchemaType } from './organization-practices-list-filter-form'
import { PracticesHistoryDialog } from './practices-history-dialog'

const columns: ColumnDef<SchemaType>[] =
  [
    {
      id: 'practiceName',
      header: ({ column }) => (
        <ColumnHeader
          label="Name"
          sortable
        />
      ),
      cell: ({ row }) => <TextCell>{row.original.practiceName}</TextCell>,
    },
    {
      id: 'npi',
      header: ({ column }) => (
        <ColumnHeader
          label="NPI"
          sortable
        />
      ),
      cell: ({ row }) => <TextCell>{row.original.npi}</TextCell>,
    },
    {
      id: 'tin',
      header: ({ column }) => (
        <ColumnHeader
          label="TIN"
          sortable
        />
      ),
      cell: ({ row }) => <TextCell>{row.original.tin}</TextCell>,
    },
    {
      id: 'taxonomyCode',
      header: ({ column }) => (
        <ColumnHeader
          label="Taxonomy Code"
          sortable
        />
      ),
      cell: ({ row }) => <TextCell hasPayment>{row.original.taxonomyCode}</TextCell>,
    },
    {
      id: 'clia',
      header: ({ column }) => (
        <ColumnHeader
          label="CLIA"
          sortable
        />
      ),
      cell: ({ row }) => <TextCell>{row.original.clia}</TextCell>,
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
      id: 'address1',
      header: ({ column }) => (
        <ColumnHeader
          label="Address 1"
          sortable
        />
      ),
      cell: ({ row }) => <TextCell>{row.original.address1}</TextCell>,
    },
    {
      id: 'address2',
      header: ({ column }) => (
        <ColumnHeader
          label="Address 2"
          sortable
        />
      ),
      cell: ({ row }) => <TextCell>{row.original.address2}</TextCell>,
    },
    {
      id: 'city',
      header: ({ column }) => (
        <ColumnHeader
          label="City"
          sortable
        />
      ),
      cell: ({ row }) => <TextCell>{row.original.city}</TextCell>,
    },
    {
      id: 'state',
      header: ({ column }) => (
        <ColumnHeader
          label="State"
          sortable
        />
      ),
      cell: ({ row }) => <TextCell>{row.original.state}</TextCell>,
    },
    {
      id: 'zip',
      header: ({ column }) => (
        <ColumnHeader
          label="ZIP"
          sortable
        />
      ),
      cell: ({ row }) => <TextCell>{row.original.zip}</TextCell>,
    },
    {
      id: 'phone',
      header: ({ column }) => (
        <ColumnHeader
          label="Phone"
          sortable
        />
      ),
      cell: ({ row }) => <TextCell>{row.original.phone}</TextCell>,
    },
    {
      id: 'fax',
      header: ({ column }) => (
        <ColumnHeader
          label="Fax"
          sortable
        />
      ),
      cell: ({ row }) => <TextCell>{row.original.fax}</TextCell>,
    },
    {
      id: 'payAddress',
      header: ({ column }) => (
        <ColumnHeader
          label="Pay Address"
          sortable
        />
      ),
      cell: ({ row }) => <TextCell>{row.original.payAddress}</TextCell>,
    },
    {
      id: 'provider',
      header: ({ column }) => (
        <ColumnHeader
          label="Default Provider"
          sortable
        />
      ),
      cell: ({ row }) => <TextCell>{row.original.provider}</TextCell>,
    },
    {
      id: 'status',
      header: ({ column }) => (
        <ColumnHeader
          label="Status"
          sortable
        />
      ),
      cell: ({ row }) => (
        <PracticesHistoryDialog row={row} />
      ),
    },
    {
      id: 'actions',
      header: () => <ColumnHeader label="Actions" />,
      cell: ActionsCell,
    },
  ]

// Will be removed in next integration ticket
const dummyData = [
  {
    practiceName: "ABC Medical Practice",
    npi: "1234567890",
    tin: "987654321",
    taxonomyCode: "207R00000X",
    clia: "12D4567890",
    organization: "ABC Health Inc.",
    address1: "123 Main Street",
    address2: "Suite 101",
    city: "New York",
    state: "NY",
    zip: "10001",
    phone: "(555) 123-4567",
    fax: "(555) 987-6543",
    payAddress: "456 Elm Street",
    provider: "Dr. John Doe",
    status: "Active",
  },
  {
    practiceName: "XYZ Family Care",
    npi: "9876543210",
    tin: "123456789",
    taxonomyCode: "207Q00000X",
    clia: "45D1236789",
    organization: "XYZ Healthcare Group",
    address1: "789 Oak Avenue",
    address2: "Floor 2",
    city: "Los Angeles",
    state: "CA",
    zip: "90001",
    phone: "(555) 987-6543",
    fax: "(555) 123-4567",
    payAddress: "123 Pine Road",
    provider: "Dr. Jane Smith",
    status: "Pending",
  },
  {
    practiceName: "LMN Pediatrics",
    npi: "4561237890",
    tin: "321654987",
    taxonomyCode: "208000000X",
    clia: "89D1234567",
    organization: "LMN Kids Healthcare",
    address1: "456 Birch Street",
    address2: "Building C",
    city: "Chicago",
    state: "IL",
    zip: "60601",
    phone: "(555) 654-3210",
    fax: "(555) 210-6543",
    payAddress: "987 Maple Drive",
    provider: "Dr. Emily Brown",
    status: "Inactive",
  },
];
const OrganizationPracticesListTable = () => {
  return (
    <Box className='bg-white rounded p-1 my-1'>
      <ScrollArea className='p-1 rounded'>
        <DataTable
          data={dummyData}
          columns={columns}
          disablePagination
          sticky
          tableClass="bg-white w-[calc(100vw_-_198px)] [&_.rt-ScrollAreaRoot]:!overflow-visible"
        />
      </ScrollArea>
    </Box>
  )
}

export { OrganizationPracticesListTable }

