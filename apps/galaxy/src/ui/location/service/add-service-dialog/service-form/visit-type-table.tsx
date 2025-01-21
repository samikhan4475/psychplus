'use client'

import { useMemo } from 'react'
import { ScrollArea } from '@radix-ui/themes'
import { ColumnDef } from '@tanstack/react-table'
import { useFormContext } from 'react-hook-form'
import { DataTable } from '@/components'
import { Encounter } from '@/types'
import { ActionCell, VisitTypeCell, VisitTypeHeaderCell } from '../cells'
import { ServiceSchemaType } from './schema'
import { VisitDropdown } from './visit-dropdown'

const columns: ColumnDef<Encounter>[] = [
  {
    id: 'typeOfVisit',
    size: 550,
    header: VisitTypeHeaderCell,
    cell: VisitTypeCell,
  },
  {
    id: 'action',
    size: 20,
    header: VisitDropdown,
    cell: ActionCell,
  },
]

interface VisitTypeTableProps {
  visitTypes?: Encounter[]
}
const VisitTypeTable = ({ visitTypes }: VisitTypeTableProps) => {
  const form = useFormContext<ServiceSchemaType>()
  const visitsIds = form.watch('serviceVisitTypes')
  const data = useMemo(
    () => visitTypes?.filter(({ id }) => visitsIds?.includes(id)) ?? [],
    [visitsIds, visitTypes],
  )

  return (
    <ScrollArea className="max-h-32 px-1">
      <DataTable
        data={data}
        columns={columns}
        disablePagination
        theadClass="z-[1]"
        sticky
      />
    </ScrollArea>
  )
}

export { VisitTypeTable }
