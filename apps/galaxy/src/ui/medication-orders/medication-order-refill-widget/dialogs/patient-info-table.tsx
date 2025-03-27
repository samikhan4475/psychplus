
import React from 'react'
import { ScrollArea } from '@radix-ui/themes'
import { ColumnDef } from '@tanstack/react-table'
import { DataTable, TextCell, ColumnHeader } from '@/components'

type PersonInfo = {
  gender: string
  dob: string
  address: string
  phone: string
  email: string
}

const columns: ColumnDef<PersonInfo>[] = [
  {
    id: 'gender',
    accessorKey: 'gender',
    header: () => <ColumnHeader label="Gender" />,
    cell: ({ row }) => <TextCell>{row.original.gender}</TextCell>,
  },
  {
    id: 'dob',
    accessorKey: 'dob',
    header: () => <ColumnHeader label="DOB" />,
    cell: ({ row }) => <TextCell>{row.original.dob}</TextCell>,
  },
  {
    id: 'address',
    accessorKey: 'address',
    header: () => <ColumnHeader label="Address" />,
    cell: ({ row }) => <TextCell>{row.original.address}</TextCell>,
  },
  {
    id: 'phone',
    accessorKey: 'phone',
    header: () => <ColumnHeader label="Phone" />,
    cell: ({ row }) => <TextCell>{row.original.phone}</TextCell>,
  },
  {
    id: 'email',
    accessorKey: 'email',
    header: () => <ColumnHeader label="Email" />,
    cell: ({ row }) => <TextCell>{row.original.email}</TextCell>,
  },
]

const dummyData: PersonInfo[] = [
  {
    gender: 'Male',
    dob: '12/11/1994',
    address: 'St 10, Willow brook',
    phone: '021-27272902',
    email: 'abc@ymail.com',
  },
]

const PatientInfoTable = () => {
  return (
    <ScrollArea>
      <DataTable
        data={dummyData}
        columns={columns}
        disablePagination
        sticky
      />
    </ScrollArea>
  )
}

export { PatientInfoTable }
