import { useEffect, useMemo } from 'react'
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
import { formatDate } from '@/utils'
import { ActionsCell } from './cells'
import { PharmacyCell } from './cells/pharmacy-cell'
import { STATUS_CODESET } from './constants'
import { useStore } from './store'
import type { PatientMedication } from './types'

const columns: ColumnDef<PatientMedication>[] = [
  {
    id: 'medication-drug',
    accessorKey: 'medicationDrug',
    header: () => <ColumnHeader label="Drug" />,
    cell: ({ row }) => (
      <TextCell>
        {row.original.prescriptionDrugs?.[0]?.drugName ?? 'N/A'}
      </TextCell>
    ),
  },
  {
    id: 'medication-strength',
    header: () => <ColumnHeader label="Strength" />,
    cell: ({ row }) => (
      <TextCell>{row.original.prescriptionDrugs?.[0]?.strength}</TextCell>
    ),
  },
  {
    id: 'medication-direction',
    accessorKey: 'medicationDirection',
    header: () => <ColumnHeader label="Direction" />,
    cell: ({ row }) => (
      <LongTextCell>
        {row.original.prescriptionDrugs?.[0]?.directions}
      </LongTextCell>
    ),
  },
  {
    id: 'medication-quantity',
    accessorKey: 'medicationQuantity',
    header: () => <ColumnHeader label="Quantity" />,
    cell: ({ row }) => (
      <TextCell>
        {row.original.prescriptionDrugs?.[0]?.quantity ?? 'N/A'}
      </TextCell>
    ),
  },
  {
    id: 'medication-refill',
    accessorKey: 'medicationRefill',
    header: () => <ColumnHeader label="Refill" />,
    cell: ({ row }) => <TextCell>{row.original.refillCount ?? 'N/A'}</TextCell>,
  },
  {
    id: 'medication-written-date',
    accessorKey: 'medicationWrittenDate',
    header: () => <ColumnHeader label="Written Date" />,
    cell: ({ row }) => (
      <DateCell>{formatDate(row.original.writtenDate) ?? 'N/A'}</DateCell>
    ),
  },
  {
    id: 'medication-end-date',
    accessorKey: 'medicationEndDate',
    header: () => <ColumnHeader label="End Date" />,
    cell: ({ row }) => (
      <DateCell>{formatDate(row.original.endDate) ?? 'N/A'}</DateCell>
    ),
  },
  {
    id: 'medication-prescriber',
    accessorKey: 'medicationPrescriber',
    header: () => <ColumnHeader label="Prescriber" />,
    cell: ({ row }) => (
      <TextCell>{row.original.providerName ?? 'N/A'}</TextCell>
    ),
  },
  {
    id: 'medication-pharmacy',
    accessorKey: 'medicationPharmacy',
    header: () => <ColumnHeader label="Pharmacy" />,
    cell: ({ row }) => <PharmacyCell row={row} />,
  },
  {
    id: 'medication-status',
    accessorKey: 'medicationStatus',
    header: () => <ColumnHeader label="Status" />,
    cell: ({ row }) => (
      <SelectCell
        value={row.original.prescriptionStatus ?? 'Unknown'}
        options={STATUS_CODESET}
      />
    ),
  },
  {
    id: 'medication-actions',
    accessorKey: 'medicationActions',
    header: () => <ColumnHeader label="Actions" />,
    cell: ActionsCell,
  },
]

const PatientMedicationsDataTable = () => {
  const store = useStore()

  const { data, fetchPatientMedications, loading } = zustandUseStore(
    store,
    (state) => ({
      data: state.data,
      loading: state.loading,
      fetchPatientMedications: state.fetchPatientMedications,
    }),
  )

  useEffect(() => {
    fetchPatientMedications()
  }, [fetchPatientMedications])

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

export { PatientMedicationsDataTable }
