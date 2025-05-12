'use client'

import { ScrollArea } from '@radix-ui/themes'
import { ColumnDef } from '@tanstack/react-table'
import { ColumnHeader, DataTable, LongTextCell, TextCell } from '@/components'
import { getMaskedPhoneNumber } from '@/utils'
import {
  EmergencyContactCell,
  GuardianCell,
  RelationshipCell,
  RRICell,
} from './cells'

interface DummyRelationship {
  address: string
  email: string
  firstName: string
  lastName: string
  middleName: string
  homePhone: string
  isEmergencyContact: boolean
  isGuardian: boolean
  isRri: boolean
  relationship: string
}

const columns: ColumnDef<DummyRelationship>[] = [
  {
    id: 'firstName',
    header: () => <ColumnHeader label="First Name" />,
    cell: ({ row }) => <TextCell>{row.original.firstName}</TextCell>,
  },
  {
    id: 'middleName',
    header: () => <ColumnHeader label="Middle Name" />,
    cell: ({ row }) => <TextCell>{row.original.middleName}</TextCell>,
  },
  {
    id: 'lastName',
    header: () => <ColumnHeader label="Last Name" />,
    cell: ({ row }) => <TextCell>{row.original.lastName}</TextCell>,
  },
  {
    id: 'relationship',
    header: () => <ColumnHeader label="Relationship" />,
    cell: RelationshipCell,
  },
  {
    id: 'address',
    header: () => <ColumnHeader label="Address" />,
    cell: ({ row }) => <LongTextCell>{row.original.address}</LongTextCell>,
  },
  {
    id: 'email',
    header: () => <ColumnHeader label="Email" />,
    cell: ({ row }) => <TextCell>{row.original.email}</TextCell>,
  },
  {
    id: 'homePhone',
    header: () => <ColumnHeader label="Home Phone" />,
    cell: ({ row }) => (
      <TextCell className="truncate">
        {getMaskedPhoneNumber(row?.original?.homePhone ?? '')}
      </TextCell>
    ),
  },
  {
    id: 'emergencyContact',
    header: () => <ColumnHeader label="Emergency Contact" />,
    cell: EmergencyContactCell,
  },
  {
    id: 'rri',
    header: () => <ColumnHeader label="RRI" />,
    cell: RRICell,
  },
  {
    id: 'guardian',
    header: () => <ColumnHeader label="Guardian" />,
    cell: GuardianCell,
  },
]

const PreferredPartnerTable = () => {
  return (
    <ScrollArea className="max-h-28">
      <DataTable
        data={data}
        columns={columns}
        disablePagination
        sticky
        theadClass="z-[1]"
      />
    </ScrollArea>
  )
}

const data: DummyRelationship[] = [...Array(14)].map((_, ind) => ({
  address: 'St 6, New York city',
  email: 'uxdesigner@gmail.com',
  firstName: 'Mat Leo',
  lastName: 'Taylor',
  middleName: 'Smith',
  homePhone: '(321) 123478-839',
  isEmergencyContact: ind % 2 === 0,
  isGuardian: ind % 2 === 0,
  isRri: ind % 2 === 0,
  relationship: 'father',
}))
export { PreferredPartnerTable, type DummyRelationship }
