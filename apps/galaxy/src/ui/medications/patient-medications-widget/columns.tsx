import { Box } from '@radix-ui/themes'
import { ColumnDef, Row } from '@tanstack/react-table'
import { ColumnHeader, DateCell, LongTextCell, TextCell } from '@/components'
import { FEATURE_FLAGS } from '@/constants'
import { useFeatureFlagEnabled } from '@/hooks/use-feature-flag-enabled'
import { formatDateManually } from '@/utils'
import {
  ActionsCell,
  EpcsSignedStatusCell,
  PharmacyCell,
  StatusCell,
  TableRowCheckboxCell,
} from './cells'
import { PatientMedication, PatientUserPrescriptionStatus } from './types'

interface UsePatientMedicationColumnsProps {
  onEditClick: (medication: PatientMedication) => void
}

const usePatientMedicationColumns = ({
  onEditClick,
}: UsePatientMedicationColumnsProps): ColumnDef<PatientMedication>[] => {
  const isFeatureFlagEnabled = useFeatureFlagEnabled(
    FEATURE_FLAGS.ehr8973EnableDawMedicationApi,
  )
  return [
    ...(!isFeatureFlagEnabled
      ? [
          {
            id: 'medication-drugs',
            size: 30,
            header: () => <ColumnHeader label="" />,
            cell: ({ row }: { row: Row<PatientMedication> }) => {
              return (
                <>
                  {row.original?.isControlledSubstance &&
                    row.original?.userTransactionStatus !==
                      PatientUserPrescriptionStatus.SUCCESS && (
                      <Box className="pl-[2px]">
                        <TableRowCheckboxCell
                          medicationId={row.original.id}
                          checked={row.getIsSelected()}
                          onCheckedChange={(v) => row.toggleSelected(v)}
                        />
                      </Box>
                    )}
                </>
              )
            },
          },
        ]
      : []),
    {
      id: 'medication-drug',
      accessorKey: 'medicationDrug',
      size: 300,
      minSize: 40,
      maxSize: 300,
      header: () => <ColumnHeader label="Drug" />,
      cell: ({ row }) => (
        <LongTextCell>{row.original.drugDescription ?? 'N/A'}</LongTextCell>
      ),
    },
    ...(isFeatureFlagEnabled
      ? [
          {
            id: 'medication-strength',
            header: () => <ColumnHeader label="Strength" />,
            cell: ({ row }: { row: Row<PatientMedication> }) => {
              const strength = row.original.medicationDetails.strength
              return (
                <TextCell>
                  <strong>{strength}</strong>
                </TextCell>
              )
            },
          },
        ]
      : []),
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
      size: 5,
      minSize: 10,
      maxSize: 100,
      header: () => <ColumnHeader label="Quantity" />,
      cell: ({ row }) => (
        <TextCell>{row.original.quantityValue ?? 'N/A'}</TextCell>
      ),
    },
    {
      id: 'medication-refill',
      accessorKey: 'medicationRefill',
      size: 5,
      minSize: 10,
      maxSize: 100,
      header: () => <ColumnHeader label="Refill" />,
      cell: ({ row }) => <TextCell>{row.original.refills ?? 'N/A'}</TextCell>,
    },
    {
      id: 'medication-written-date',
      accessorKey: 'medicationWrittenDate',
      size: 10,
      minSize: 10,
      maxSize: 100,
      header: () => <ColumnHeader label="Written Date" />,
      cell: ({ row }) => {
        const writtenDate = row.original.writtenDate
        const formattedDate =
          writtenDate === '0001-01-01T00:00:00Z'
            ? 'N/A'
            : formatDateManually(writtenDate) ?? ''
        return <DateCell>{formattedDate}</DateCell>
      },
    },
    ...(!isFeatureFlagEnabled
      ? [
          {
            id: 'effecive-date',
            accessorKey: 'effectiveDate',
            size: 5,
            minSize: 5,
            maxSize: 100,
            header: () => <ColumnHeader label="Effective Date" />,
            cell: ({ row }: { row: Row<PatientMedication> }) => (
              <DateCell>
                {row.original.effectiveDate
                  ? formatDateManually(row.original.effectiveDate)
                  : ''}
              </DateCell>
            ),
          },
        ]
      : []),

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
      size: 5,
      minSize: 5,
      maxSize: 100,
      header: () => <ColumnHeader label="Status" />,
      cell: ({ row }) => <StatusCell row={row} />,
    },
    ...(!isFeatureFlagEnabled
      ? [
          {
            id: 'transaction-status',
            accessorKey: 'transactionStatus',
            size: 5,
            minSize: 5,
            maxSize: 100,
            header: () => <ColumnHeader label="Transmit Status" />,
            cell: ({ row }: { row: Row<PatientMedication> }) => (
              <TextCell>{row.original?.userTransactionStatus}</TextCell>
            ),
          },
          {
            id: 'epcs-status',
            accessorKey: 'epcsStatus',
            size: 5,
            minSize: 5,
            maxSize: 100,
            header: () => <ColumnHeader label="" />,
            cell: EpcsSignedStatusCell,
          },
        ]
      : []),
    {
      id: 'medication-actions',
      accessorKey: 'medicationActions',
      header: () => <ColumnHeader label="Actions" />,
      cell: ({ row }) => <ActionsCell row={row} onEditClick={onEditClick} />,
    },
  ]
}

export { usePatientMedicationColumns }
