'use client'

import { ScrollArea } from '@radix-ui/themes'
import { ColumnDef } from '@tanstack/react-table'
import { useFormContext } from 'react-hook-form'
import { ColumnHeader, DataTable } from '@/components'
import { EmergencyContactCell, GuardianCell, RRICell } from './cells'
import { AddRelationshipSchemaType } from './schema'

const columns: ColumnDef<AddRelationshipSchemaType>[] = [
  {
    id: 'isEmergencyContact',
    header: () => <ColumnHeader label="Emergency Contact" />,
    cell: EmergencyContactCell,
  },
  {
    id: 'isAllowedToReleaseInformation',
    header: () => <ColumnHeader label="RRI" />,
    cell: RRICell,
  },
  {
    id: 'isGuardian',
    header: () => <ColumnHeader label="Guardian" />,
    cell: GuardianCell,
  },
]
const RelationshipTable = () => {
  const form = useFormContext<AddRelationshipSchemaType>()

  const data = form.watch()

  return (
    <ScrollArea className="my-2 max-h-[120px]">
      <DataTable columns={columns} data={[data]} theadClass="z-[1]" sticky />
    </ScrollArea>
  )
}

export default RelationshipTable
