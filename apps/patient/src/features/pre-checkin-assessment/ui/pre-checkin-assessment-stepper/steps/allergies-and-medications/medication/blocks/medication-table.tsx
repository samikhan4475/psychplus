import React from 'react'
import { cn, getSlashedDateString } from '@psychplus-v2/utils'
import { Table } from '@radix-ui/themes'
import { EmptyFileIcon, FeatureEmpty } from '@/components-v2'
import { PatientMedication } from '@/features/medications/types/medications'

const ColumnHeader = ({ children }: { children: React.ReactNode }) => (
  <Table.ColumnHeaderCell className="h-auto overflow-clip py-2 text-[12px] font-medium">
    {children}
  </Table.ColumnHeaderCell>
)

type medicationTableProps = {
  medications: PatientMedication[]
}

const MedicationTable = ({ medications }: medicationTableProps) => {
  return (
    <Table.Root variant="ghost" size="2" className="w-full">
      <Table.Header className={cn('bg-[#EBF3FC]')}>
        <Table.Row>
          <ColumnHeader>Drug</ColumnHeader>
          <ColumnHeader>Strength</ColumnHeader>
          <ColumnHeader>Quantity</ColumnHeader>
          <ColumnHeader>Written Date</ColumnHeader>
          <ColumnHeader>End Date</ColumnHeader>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {medications.length === 0 && (
          <Table.Row>
            <Table.Cell colSpan={11}>
              <FeatureEmpty
                description="No Medication added yet"
                Icon={EmptyFileIcon}
              />
            </Table.Cell>
          </Table.Row>
        )}

        {medications.map((row) => (
          <Table.Row key={row.externalPrescriptionId}>
            <Table.Cell>{row.drugDescription}</Table.Cell>
            <Table.Cell>{row.medicationDetails.strength}</Table.Cell>
            <Table.Cell>{row.quantityValue}</Table.Cell>
            <Table.Cell>{getSlashedDateString(row.writtenDate)}</Table.Cell>
            <Table.Cell>{getSlashedDateString(row.endDateTime)}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  )
}

export default MedicationTable
