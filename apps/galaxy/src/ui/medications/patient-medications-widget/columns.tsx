import { ColumnDef } from '@tanstack/react-table'
import { ColumnHeader, DateCell, LongTextCell, TextCell } from '@/components'
import { formatDateManually } from '@/utils'
import { ActionsCell, PharmacyCell, StatusCell } from './cells'
import { PatientMedication } from './types'

const columns: ColumnDef<PatientMedication>[] = [
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
    cell: ({ row }) => (
      <LongTextCell>{row.original.medicationDetails.strength}</LongTextCell>
    ),
  },
  {
    id: 'medication-direction',
    accessorKey: 'medicationDirection',
    header: () => <ColumnHeader label="Direction" />,
    cell: ({ row }) => (
      <LongTextCell>{row.original.medicationDetails.directions}</LongTextCell>
    ),
  },
  {
    id: 'medication-quantity',
    accessorKey: 'medicationQuantity',
    header: () => <ColumnHeader label="Quantity" />,
    cell: ({ row }) => (
      <TextCell>{row.original.quantityValue ?? 'N/A'}</TextCell>
    ),
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
      <DateCell>
        {formatDateManually(row.original.writtenDate) ?? 'N/A'}
      </DateCell>
    ),
  },
  {
    id: 'medication-end-date',
    accessorKey: 'medicationEndDate',
    header: () => <ColumnHeader label="End Date" />,
    cell: ({ row }) => (
      <DateCell>
        {formatDateManually(row.original.endDateTime) ?? 'N/A'}
      </DateCell>
    ),
  },
  {
    id: 'medication-prescriber',
    accessorKey: 'medicationPrescriber',
    header: () => <ColumnHeader label="Prescriber" />,
    cell: ({ row }) => (
      <TextCell>
        {row.original.medicationDetails.providerName ?? 'N/A'}
      </TextCell>
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
    cell: ({ row }) => <StatusCell row={row} />,
  },
  {
    id: 'medication-actions',
    accessorKey: 'medicationActions',
    header: () => <ColumnHeader label="Actions" />,
    cell: ({ row }) => <ActionsCell row={row} />,
  },
]
export { columns }
