'use client'

import { useEffect } from 'react'
import { Flex, ScrollArea } from '@radix-ui/themes'
import { type ColumnDef } from '@tanstack/react-table'
import { useStore as zustandUseStore } from 'zustand'
import {
  ColumnHeader,
  DataTable,
  DateTimeCell,
  LoadingPlaceholder,
  SelectCell,
  TextCell,
} from '@/components'
import { ActionsCell, AddToNoteCell } from './cells'
import { useStore } from './store'
import type { PatientVital } from './types'

const columns: ColumnDef<PatientVital>[] = [
  {
    id: 'vital-date-time',
    header: () => <ColumnHeader label="Date/Time" />,
    cell: ({ row }) => {
      return <DateTimeCell>{row.original.dateTime}</DateTimeCell>
    },
  },
  {
    id: 'vital-bp',
    header: () => <ColumnHeader label="BP (sys/dia)" />,
    cell: ({ row }) => {
      return <TextCell>{row.original.bp}</TextCell>
    },
  },
  {
    id: 'vital-hr',
    header: () => <ColumnHeader label="HR (bpm)" />,
    cell: ({ row }) => {
      return <TextCell>{row.original.hr}</TextCell>
    },
  },
  {
    id: 'vital-rr',
    header: () => <ColumnHeader label="RR (bpm)" />,
    cell: ({ row }) => {
      return <TextCell>{row.original.rr}</TextCell>
    },
  },
  {
    id: 'vital-temp',
    header: () => <ColumnHeader label="Temp (C)" />,
    cell: ({ row }) => {
      return <TextCell>{row.original.temp}</TextCell>
    },
  },
  {
    id: 'vital-weight',
    header: () => <ColumnHeader label="Weight (kg)" />,
    cell: ({ row }) => {
      return <TextCell>{row.original.weight}</TextCell>
    },
  },
  {
    id: 'vital-height',
    header: () => <ColumnHeader label="Height (cm)" />,
    cell: ({ row }) => {
      return <TextCell>{row.original.height}</TextCell>
    },
  },
  {
    id: 'vital-hc',
    header: () => <ColumnHeader label="HC (cm)" />,
    cell: ({ row }) => {
      return <TextCell>{row.original.hc}</TextCell>
    },
  },
  {
    id: 'vital-pulse-oximetry',
    header: () => <ColumnHeader label="Pulse Oximetry" />,
    cell: ({ row }) => {
      return <TextCell>{row.original.pulseOximetry}</TextCell>
    },
  },
  {
    id: 'vital-oxygen-concentration',
    header: () => <ColumnHeader label="Oxygen Concentration" />,
    cell: ({ row }) => {
      return <TextCell>{row.original.oxygenConcentration}</TextCell>
    },
  },
  {
    id: 'vital-bmi',
    header: () => <ColumnHeader label="BMI" />,
    cell: ({ row }) => {
      return <TextCell>{row.original.bmi}</TextCell>
    },
  },
  {
    id: 'vital-status',
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
    id: 'vital-add-to-note',
    header: () => <ColumnHeader label="Add to Note" />,
    cell: AddToNoteCell,
  },
  {
    id: 'vital-actions',
    header: () => <ColumnHeader label="Actions" />,
    cell: ActionsCell,
  },
]

const VitalsTable = () => {
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
        data={data?.vitals ?? []}
        columns={columns}
        disablePagination
        sticky
      />
    </ScrollArea>
  )
}

export { VitalsTable }
