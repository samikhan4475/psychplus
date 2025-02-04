'use client'

import { useEffect } from 'react'
import { Flex, ScrollArea } from '@radix-ui/themes'
import { type ColumnDef } from '@tanstack/react-table'
import {
  ColumnHeader,
  DataTable,
  DateCell,
  LoadingPlaceholder,
  LongTextCell,
  TextCell,
} from '@/components'
import { getSlashedPaddedDateString } from '@/utils'
import { ActionsCell, SeverityCell } from './cells'
import { useStore } from './store'
import type { AllergyDataResponse } from './types'
interface PatientAllergiesTableProps {
  patientId: string;
  scriptSureAppUrl: string;
}

  const columns = (
    scriptSureAppUrl: string,
  ): ColumnDef<AllergyDataResponse>[] =>
    [
  {
    id: 'allergy-type',
    header: ({ column }) => (
      <ColumnHeader column={column} clientSideSort label="Type" />
    ),
    cell: ({ row }) => <TextCell>{row.original.allergyType}</TextCell>,
  },
  {
    id: 'allergy-name',
    header: ({ column }) => (
      <ColumnHeader clientSideSort column={column} label="Allergy" />
    ),
    cell: ({ row }) => <TextCell>{row.original.allergyName}</TextCell>,
  },
  {
    id: 'allergy-reaction',
    header: ({ column }) => (
      <ColumnHeader clientSideSort column={column} label="Reaction" />
    ),
    cell: ({ row }) => <TextCell>{row.original.reaction}</TextCell>,
  },
  {
    id: 'allergy-severity',
    header: ({ column }) => (
      <ColumnHeader clientSideSort column={column} label="Severity" />
    ),
    cell: SeverityCell,
  },
  {
    id: 'allergy-status',
    header: ({ column }) => (
      <ColumnHeader clientSideSort column={column} label="Status" />
    ),
    cell: ({ row }) => (
      <TextCell>{row.original.archive === 0 ? 'Active' : 'Inactive'}</TextCell>
    ),
  },
  {
    id: 'allergy-observation-date',
    header: ({ column }) => (
      <ColumnHeader clientSideSort column={column} label="Observation Date" />
    ),
    cell: ({ row }) => (
      <DateCell>
        {getSlashedPaddedDateString(`${row.original.onsetBegan}`)}
      </DateCell>
    ),
  },
  {
    id: 'allergy-end-date',
    header: ({ column }) => (
      <ColumnHeader clientSideSort column={column} label="End Date" />
    ),
    cell: ({ row }) => (
      <DateCell>
        {getSlashedPaddedDateString(`${row.original.onsetEnded}`)}
      </DateCell>
    ),
  },
  {
    id: 'allergy-notes',
    header: ({ column }) => (
      <ColumnHeader column={column} clientSideSort label="Notes" />
    ),
    cell: ({ row }) => <LongTextCell>{row.original.comment}</LongTextCell>,
  },
  {
    id: 'allergy-actions',
    header: ({ column }) => <ColumnHeader column={column} label="Actions" />,
    cell: ({ row }) => (
      <ActionsCell 
        row={row} 
        scriptSureAppUrl={scriptSureAppUrl} 
      />
    ),
  },
]

const PatientAllergiesTable = ({ patientId, scriptSureAppUrl }: PatientAllergiesTableProps) => {
  const { data, allergiesListSearch, allergiesListLoading } = useStore(
    (state) => ({
      data: state.allergiesListData,
      allergiesListLoading: state.allergiesListLoading,
      allergiesListSearch: state.allergiesListSearch,
    }),
  )

  useEffect(() => {
    allergiesListSearch(patientId)
  }, [])

  if (allergiesListLoading) {
    return (
      <Flex height="100%" align="center" justify="center">
        <LoadingPlaceholder />
      </Flex>
    )
  }

  return (
    <ScrollArea>
      <DataTable data={data ?? []} columns={columns(scriptSureAppUrl)} disablePagination sticky />
    </ScrollArea>
  )
}

export { PatientAllergiesTable }
