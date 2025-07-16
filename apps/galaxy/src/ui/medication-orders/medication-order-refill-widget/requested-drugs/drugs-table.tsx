import { Box, Flex, ScrollArea, TextField } from '@radix-ui/themes'
import { ColumnDef } from '@tanstack/react-table'
import { useFormContext } from 'react-hook-form'
import {
  ColumnHeader,
  DataTable,
  FormFieldLabel,
  LongTextCell,
  TextCell,
} from '@/components'
import { formatDateOfBirth, getAgeFromDate, getCalendarDate } from '@/utils'
import { UpdateMedicationSchema } from '../dialogs/schema'
import { MedicationRefill, PharmacyNotificationDrugModel } from '../types'
import MedicineDosageCell from './dosage-cell'
import MedicineNameCell from './medicine-name-cell'
import { TableRowRadioCell } from './radio-button-cell'

interface RequestedDrugTableProps {
  filteredData: MedicationRefill
  onSelectDrug: (drug: PharmacyNotificationDrugModel) => void
  selectedDrug?: PharmacyNotificationDrugModel | null
}

const columns = (
  onSelectDrug: (drug: PharmacyNotificationDrugModel) => void,
  selectedDrug: PharmacyNotificationDrugModel | null | undefined,
): ColumnDef<PharmacyNotificationDrugModel>[] => {
  return [
    {
      id: 'select',
      size: 10,
      header: () => <ColumnHeader label="" />,
      cell: ({ row }) => (
        <Box className="pl-[2px]">
          <TableRowRadioCell
            row={row}
            onSelect={onSelectDrug}
            selectedDrugId={selectedDrug?.id}
          />
        </Box>
      ),
    },
    {
      id: 'drugDescription',
      accessorKey: 'drugDescription',
      header: () => <ColumnHeader label="Medicine Name" />,
      cell: ({ row }) => <MedicineNameCell row={row} />,
    },
    {
      id: 'quantityValue',
      accessorKey: 'quantityValue',
      header: ({ column }) => <ColumnHeader label="Qty/Dosage" />,
      cell: ({ row }) => <MedicineDosageCell row={row} />,
    },
    {
      id: 'daysSupply',
      accessorKey: 'daysSupply',
      header: () => <ColumnHeader label="Days Supply" />,
      cell: ({ row }) => (
        <TextCell className="w-[10px]">{row.original?.daysSupply}</TextCell>
      ),
    },
    {
      id: 'refills',
      accessorKey: 'refills',
      header: () => <ColumnHeader label="Refills" />,
      cell: ({ row }) => <TextCell>{row.original?.refills}</TextCell>,
    },
    {
      id: 'isSubstitutionsAllowed',
      accessorKey: 'isSubstitutionsAllowed',
      header: () => <ColumnHeader label="Substitution" />,
      cell: ({ row }) => (
        <TextCell>
          {!row?.original?.isSubstitutionsAllowed ? 'Yes' : 'No'}
        </TextCell>
      ),
    },
    {
      id: 'signatureText',
      accessorKey: 'signatureText',
      header: () => <ColumnHeader label="Sig" />,
      cell: ({ row }) => (
        <LongTextCell className="w-[200px]">
          {row?.original?.drugSignatureList?.[0]?.signatureText}
        </LongTextCell>
      ),
    },
    {
      id: 'notes',
      header: ({ column }) => <ColumnHeader label="Notes/Comments" />,
      cell: ({ row }) => (
        <LongTextCell className="w-[200px]">
          {row?.original.drugNote}
        </LongTextCell>
      ),
    },
  ]
}
const RequestedDrugTable = ({
  filteredData,
  onSelectDrug,
  selectedDrug,
}: RequestedDrugTableProps) => {
  const patientLastName = filteredData.patientLastName
  const patientFirstName = filteredData.patientFirstName
  const patientDateOfBirth = filteredData.patientDateOfBirth
  const patientGender = filteredData.patientGender

  const patientName = `${patientFirstName} ${patientLastName}`
  const patientSummary = `${patientName}, ${formatDateOfBirth(
    patientDateOfBirth ?? '',
  )} | ${getAgeFromDate(getCalendarDate(patientDateOfBirth))} yo ${
    patientGender?.charAt(0) || ''
  }`

  const displayString = (): string => {
    const businessAddress = filteredData.pharmacyAddress
    const pharmacyName = filteredData.pharmacyName
    const address = `${businessAddress?.street1 ?? ''}, ${
      businessAddress?.city ?? ''
    }, ${businessAddress?.state ?? ''}`

    return `${pharmacyName} | ${address}`
  }

  return (
    <>
      <Flex gap="2" justify="between" direction="row" className="p-2">
        <Box className="flex-1">
          <FormFieldLabel>Patient Name</FormFieldLabel>
          <TextField.Root
            value={patientSummary}
            className="h-6  w-full"
            size="1"
            disabled
          />
        </Box>
        <Box className="flex-1">
          {' '}
          <FormFieldLabel>Pharmacy</FormFieldLabel>
          <TextField.Root
            value={displayString()}
            className="h-6  w-full"
            size="1"
            disabled
          />
        </Box>
      </Flex>
      <ScrollArea scrollbars="vertical" className="max-h-52 p-2">
        <DataTable
          data={filteredData?.drugList ?? []}
          columns={columns(onSelectDrug, selectedDrug)}
          disablePagination
          sticky
        />
      </ScrollArea>
    </>
  )
}

export { RequestedDrugTable }
