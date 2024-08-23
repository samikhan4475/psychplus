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
import { ActionsCell, AddToNoteCell } from './cells'
import { useStore } from './store'
import type { PatientMedication } from './types'

const columns: ColumnDef<PatientMedication>[] = [
  {
    id: 'medication-type',
    header: () => <ColumnHeader label="Type" />,
    cell: ({ row }) => {
      return <TextCell>{row.original.type}</TextCell>
    },
  },
  {
    id: 'medication-name',
    header: () => <ColumnHeader label="Drug" />,
    cell: ({ row }) => {
      return <TextCell>{row.original.drugName}</TextCell>
    },
  },
  {
    id: 'medication-strength',
    header: () => <ColumnHeader label="Strength" />,
    cell: ({ row }) => {
      return <TextCell>{row.original.strength}</TextCell>
    },
  },
  {
    id: 'medication-directions',
    header: () => <ColumnHeader label="Directions" />,
    cell: ({ row }) => {
      return <LongTextCell>{row.original.directions}</LongTextCell>
    },
  },
  {
    id: 'medication-quentity',
    header: () => <ColumnHeader label="Quantity" />,
    cell: ({ row }) => {
      return <TextCell>{row.original.quantity}</TextCell>
    },
  },
  {
    id: 'medication-refills',
    header: () => <ColumnHeader label="Refills" />,
    cell: ({ row }) => {
      return <TextCell>{row.original.refills}</TextCell>
    },
  },
  {
    id: 'medication-written-date',
    header: () => <ColumnHeader label="Written Date" />,
    cell: ({ row }) => {
      return <DateCell>{row.original.writtenDate}</DateCell>
    },
  },
  {
    id: 'medication-end-date',
    header: () => <ColumnHeader label="End Date" />,
    cell: ({ row }) => {
      return <DateCell>{row.original.endDate}</DateCell>
    },
  },
  {
    id: 'medication-prescriber',
    header: () => <ColumnHeader label="Prescriber" />,
    cell: ({ row }) => {
      return <LongTextCell>{row.original.refills}</LongTextCell>
    },
  },
  {
    id: 'medication-pharmacy',
    header: () => <ColumnHeader label="Prescriber" />,
    cell: ({ row }) => {
      return <LongTextCell>{row.original.pharmacy}</LongTextCell>
    },
  },
  {
    id: 'medication-status',
    header: () => <ColumnHeader label="Status" />,
    cell: ({ row }) => {
      return (
        <SelectCell
          value={row.original.status}
          options={[
            { value: 'active', label: 'Active' },
            { value: 'pending', label: 'Pending' },
            { value: 'discontinued', label: 'Discontinued' },
          ]}
        />
      )
    },
  },
  {
    id: 'medication-add-to-note',
    header: () => <ColumnHeader label="Add to Note" />,
    cell: AddToNoteCell,
  },
  {
    id: 'medication-actions',
    header: () => <ColumnHeader label="Actions" />,
    cell: ActionsCell,
  },
]

const PatientMedicationsTable = () => {
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
        data={data?.medications ?? []}
        columns={columns}
        disablePagination
        sticky
      />
    </ScrollArea>
  )
}

export { PatientMedicationsTable }
