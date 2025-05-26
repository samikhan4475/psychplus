'use client'

import { Box, ScrollArea } from '@radix-ui/themes'
import { type ColumnDef } from '@tanstack/react-table'
import { ColumnHeader, DataTable } from '@/components'
import {
  ActionsCell,
  Address1Cell,
  Address2Cell,
  CityCell,
  NameCell,
  NPICell,
  PhoneCell,
  ProviderCell,
  StateCell,
  ZIPCell,
  ZIPLast4Cell,
} from './cells'
import { VirtualAddressDetails } from './types'

const columns: ColumnDef<VirtualAddressDetails>[] = [
  {
    id: 'name',
    header: ({ column }) => <ColumnHeader label="Name" sortable />,
    cell: NameCell,
  },
  {
    id: 'primaryAddress',
    header: ({ column }) => <ColumnHeader label="Address 1" sortable />,
    cell: Address1Cell,
  },
  {
    id: 'primaryAddress2',
    header: ({ column }) => <ColumnHeader label="Address 2" sortable />,
    cell: Address2Cell,
  },
  {
    id: 'city',
    header: ({ column }) => <ColumnHeader label="City" sortable />,
    cell: CityCell,
  },
  {
    id: 'state',
    header: ({ column }) => <ColumnHeader label="State" sortable />,
    cell: StateCell,
  },
  {
    id: 'zip',
    header: ({ column }) => <ColumnHeader label="ZIP" sortable />,
    cell: ZIPCell,
  },
  {
    id: 'areaCode',
    header: ({ column }) => <ColumnHeader label="Area Code" sortable />,
    cell: ZIPLast4Cell,
  },
  {
    id: 'phone',
    header: ({ column }) => <ColumnHeader label="Phone" sortable />,
    cell: PhoneCell,
  },
  {
    id: 'npi',
    header: ({ column }) => (
      <ColumnHeader label="Default Provider NPI" sortable />
    ),
    cell: NPICell,
  },
  {
    id: 'provider',
    header: ({ column }) => <ColumnHeader label="Default Provider" sortable />,
    cell: ProviderCell,
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
    id: '1',
    name: 'ABC',
    npi: '1234567890',
    tin: '987654321',
    taxonomyCode: '207R00000X',
    primaryAddress: '123 Main Street',
    primaryAddress2: 'Suite 101',
    city: 'New York',
    state: 'NY',
    zip: '10001',
    zipLast4: '1000',
    phone: '(555) 123-4567',
    provider: 'Dr. John Doe',
    status: 'Active',
  },
  {
    id: '2',
    name: 'XYZ Family Care',
    npi: '9876543210',
    primaryAddress: '789 Oak Avenue',
    primaryAddress2: 'Floor 2',
    city: 'Los Angeles',
    state: 'CA',
    zip: '90001',
    zipLast4: '1000',
    phone: '(555) 987-6543',
    fax: '(555) 123-4567',
    provider: 'Dr. Jane Smith',
  },
  {
    id: '3',
    name: 'LMN Pediatrics',
    npi: '4561237890',
    primaryAddress: '456 Birch Street',
    primaryAddress2: 'Building C',
    city: 'Chicago',
    state: 'IL',
    zip: '60601',
    zipLast4: '1000',
    phone: '(555) 654-3210',
    provider: 'Dr. Emily Brown',
  },
]

const VirtualAddressesListTable = () => {
  return (
    <Box className="bg-white rounded my-1 p-1">
      <ScrollArea className="rounded p-1">
        <DataTable
          data={dummyData}
          columns={columns}
          disablePagination
          sticky
          tableClass="bg-white "
        />
      </ScrollArea>
    </Box>
  )
}

export { VirtualAddressesListTable }
