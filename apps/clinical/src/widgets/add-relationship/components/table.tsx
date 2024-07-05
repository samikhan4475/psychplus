import React from 'react'
import { Text } from '@radix-ui/themes'
import { ColumnDef } from '@tanstack/react-table'
import type { PatientRelationship } from '@psychplus/patient'
import { DataTable } from '@psychplus/ui/data-table'
import { EmergencyContactSwitch } from './emergency-contact-switch'
import { GuardianStatusSwitch } from './guardian-status-switch'
import { RriSwitch } from './rri-switch'

const columns: ColumnDef<PatientRelationship>[] = [
  {
    id: 'Emergency-Contact',
    accessorKey: 'isEmergencyContact',
    header: () => <Text className="font-[400]">Emergency Contact</Text>,
    cell: () => <EmergencyContactSwitch />,
  },
  {
    id: 'rri',
    accessorKey: 'isAllowedToReleaseInformation',
    header: () => <Text className="font-[400]">RRI</Text>,
    cell: () => <RriSwitch />,
  },
  {
    id: 'Guardian',
    accessorKey: 'isGuardian',
    header: () => <Text className="font-[400]">Guardian</Text>,
    cell: () => <GuardianStatusSwitch />,
  },
]

interface TableProps {
  data: PatientRelationship[]
}

const RelationshipTable = ({ data }: TableProps) => {
  return (
    <DataTable
      tHeadClass="bg-[#F0F4FF]"
      thClass="[box-shadow:inset_0_0_0_0.2px_#0134DB72] pl-1"
      tableClass="shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]"
      columnCellClass="[box-shadow:inset_0_0_0_0.1px_#0134DB72] pl-1"
      data={data}
      columns={columns}
    />
  )
}

const MemoizedTable = React.memo(RelationshipTable)

export { MemoizedTable }
