'use client'

import { useEffect } from 'react'
import { Flex, ScrollArea } from '@radix-ui/themes'
import { type ColumnDef } from '@tanstack/react-table'
import { useStore as zustandUseStore } from 'zustand'
import {
  ColumnHeader,
  DataTable,
  DateCell,
  LoadingPlaceholder,
  LongTextCell,
  SelectCell,
  TextCell,
} from '@/components'
import { ActionsCell, AddToNoteCell, SeverityCell } from './cells'
import { useStore } from './store'
import type { PatientAllergy, PatientAllergyRow } from './types'

const columns: ColumnDef<PatientAllergy>[] = [
  {
    id: 'allergy-type',
    header: () => <ColumnHeader label="Type" />,
    cell: ({ row }) => {
      return <TextCell>{row.original.type}</TextCell>
    },
  },
  {
    id: 'allergy-name',
    header: () => <ColumnHeader label="Allergy" />,
    cell: ({ row }) => {
      return <TextCell>{row.original.name}</TextCell>
    },
  },
  {
    id: 'allergy-reaction',
    header: () => <ColumnHeader label="Reaction" />,
    cell: ({ row }) => {
      return <TextCell>{row.original.reaction}</TextCell>
    },
  },
  {
    id: 'allergy-severity',
    header: () => <ColumnHeader label="Severity" />,
    cell: SeverityCell,
  },
  {
    id: 'allergy-status',
    header: () => <ColumnHeader label="Status" />,
    cell: ({ row }) => {
      return (
        <SelectCell
          value={row.original.status}
          options={[
            { value: 'active', label: 'Active' },
            { value: 'inactive', label: 'Inactive' },
          ]}
        />
      )
    },
  },
  {
    id: 'allergy-observation-date',
    header: () => <ColumnHeader label="Observation Date" />,
    cell: ({ row }) => {
      return <DateCell>{row.original.observationDate}</DateCell>
    },
  },
  {
    id: 'allergy-end-date',
    header: () => <ColumnHeader label="End Date" />,
    cell: ({ row }) => {
      return <DateCell>{row.original.endDate}</DateCell>
    },
  },
  {
    id: 'allergy-notes',
    header: () => <ColumnHeader label="Notes" />,
    cell: ({ row }) => {
      return <LongTextCell>{row.original.notes}</LongTextCell>
    },
  },
  {
    id: 'allergy-add-to-note',
    header: () => <ColumnHeader label="Add to Note" />,
    cell: AddToNoteCell,
  },
  {
    id: 'allergy-actions',
    header: () => <ColumnHeader label="Actions" />,
    cell: ActionsCell,
  },
]

const PatientAllergiesTable = () => {
  const store = useStore()

  const { data, fetch, loading } = zustandUseStore(store, (state) => ({
    data: state.data,
    loading: state.loading,
    fetch: state.fetch,
  }))

  useEffect(() => {
    fetch()
  }, [])

  if (loading) {
    return (
      <Flex height="100%" align="center" justify="center">
        <LoadingPlaceholder />
      </Flex>
    )
  }

  return (
    <ScrollArea>
      <DataTable
        data={data?.allergies ?? []}
        columns={columns}
        disablePagination
        sticky
      />
    </ScrollArea>
  )
}

export { PatientAllergiesTable }
