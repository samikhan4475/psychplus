import React, { useEffect } from 'react'
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
import { formatDate } from '@/utils'
import { ActionsCell } from './cells'
import { PharmacyCell } from './cells/pharmacy-cell'
import { useStore } from './store'
import type { PatientMedication } from './types'
import { useParams } from 'next/navigation'
import { StatusCell } from './cells/status-cell'
import { useShallow } from 'zustand/react/shallow'

const columns = (
  scriptSureAppUrl: string,
): ColumnDef<PatientMedication>[] =>
  [
    {
      id: 'medication-drug',
      accessorKey: 'medicationDrug',
      header: () => <ColumnHeader label="Drug" />,
      cell: ({ row }) => (
        <LongTextCell>{row.original.drugDescription ?? 'N/A'}</LongTextCell>
      ),
    },
    {
      id: 'medication-strength',
      header: () => <ColumnHeader label="Strength" />,
      cell: ({ row }) => <LongTextCell>{row.original.medicationDetails.strength}</LongTextCell>,
    },
    {
      id: 'medication-direction',
      accessorKey: 'medicationDirection',
      header: () => <ColumnHeader label="Direction" />,
      cell: ({ row }) => <LongTextCell>{row.original.medicationDetails.directions}</LongTextCell>,
    },
    {
      id: 'medication-quantity',
      accessorKey: 'medicationQuantity',
      header: () => <ColumnHeader label="Quantity" />,
      cell: ({ row }) => <TextCell>{row.original.quantityValue ?? 'N/A'}</TextCell>,
    },
    {
      id: 'medication-refill',
      accessorKey: 'medicationRefill',
      header: () => <ColumnHeader label="Refill" />,
      cell: ({ row }) => <TextCell>{row.original.refills ?? 'N/A'}</TextCell>,
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
        <DateCell>{formatDate(row.original.endDateTime) ?? 'N/A'}</DateCell>
      ),
    },
    {
      id: 'medication-prescriber',
      accessorKey: 'medicationPrescriber',
      header: () => <ColumnHeader label="Prescriber" />,
      cell: ({ row }) => (
        <TextCell>{row.original.medicationDetails.providerName ?? 'N/A'}</TextCell>
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
      cell: ({ row }) => <StatusCell row={row} />
    },
    {
      id: 'medication-actions',
      accessorKey: 'medicationActions',
      header: () => <ColumnHeader label="Actions" />,
      cell: ({ row }) => (
        <ActionsCell
          row={row}
          scriptSureAppUrl={scriptSureAppUrl}
        />
      )
    },
  ]
interface PatientMedicationsDataTableProps {
  scriptSureAppUrl: string
}
const PatientMedicationsDataTable = React.memo(({
  scriptSureAppUrl,
}: PatientMedicationsDataTableProps) => {
  const patientId = useParams().id as string

  const { data, fetchPatientMedications, loading, fetchExternalScriptsurePatientId } = useStore(
    useShallow((state) => ({
      data: state.data,
      loading: state.loading,
      fetchPatientMedications: state.fetchPatientMedications,
      fetchExternalScriptsurePatientId: state.fetchExternalScriptsurePatientId
    })),
  )
  useEffect(() => {
    fetchPatientMedications(patientId)
    fetchExternalScriptsurePatientId(patientId)
  }, [fetchPatientMedications, fetchExternalScriptsurePatientId])

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
        columns={columns(scriptSureAppUrl)}
        disablePagination
        sticky
      />
    </ScrollArea>
  )
})

PatientMedicationsDataTable.displayName = "PatientMedicationsDataTable"

export { PatientMedicationsDataTable }
