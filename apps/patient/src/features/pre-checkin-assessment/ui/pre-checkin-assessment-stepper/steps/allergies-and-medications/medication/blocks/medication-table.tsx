import React from 'react'
import { cn } from '@psychplus-v2/utils'
import { Table } from '@radix-ui/themes'
import { EmptyFileIcon, FeatureEmpty } from '@/components-v2'

const ColumnHeader = ({ children }: { children: React.ReactNode }) => (
  <Table.ColumnHeaderCell className="h-auto overflow-clip py-2 text-[12px] font-medium">
    {children}
  </Table.ColumnHeaderCell>
)

type medicationTableProps = {
  headerClassName?: string
}

const rowData = [
  {
    id: 1,
    name: 'Walgreens',
    severity: '12/6/2024',
    status: 'Active',
    reaction: 'Shortness',
    observationDate: '12/12/2024',
    label: 'Table Row 1',
  },
  {
    id: 2,
    name: 'XYZ',
    severity: '12/6/2024',
    status: 'Active',
    reaction: 'Shortness',
    observationDate: '12/12/2024',
    label: 'Table Row 2',
  },
  {
    id: 3,
    name: 'ABC',
    severity: '12/6/2024',
    status: 'Active',
    reaction: 'Shortness',
    observationDate: '12/12/2024',
    label: 'Table Row 3',
  },
]

const MedicationTable = ({ headerClassName }: medicationTableProps) => {
  return (
    <Table.Root variant="ghost" size="2" className="w-full">
      <Table.Header className={cn('bg-[#EBF3FC]', headerClassName)}>
        <Table.Row>
          <ColumnHeader>Name</ColumnHeader>
          <ColumnHeader>Severity</ColumnHeader>
          <ColumnHeader>Status</ColumnHeader>
          <ColumnHeader>Reaction</ColumnHeader>
          <ColumnHeader>Observation Date</ColumnHeader>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {rowData.length === 0 && (
          <Table.Row>
            <Table.Cell colSpan={11}>
              <FeatureEmpty
                description="No Allergies added yet"
                Icon={EmptyFileIcon}
              />
            </Table.Cell>
          </Table.Row>
        )}

        {rowData.map((row) => (
          <Table.Row key={row.id}>
            <Table.Cell>{row.name}</Table.Cell>
            <Table.Cell>{row.severity}</Table.Cell>
            <Table.Cell>{row.status}</Table.Cell>
            <Table.Cell>{row.reaction}</Table.Cell>
            <Table.Cell>{row.observationDate}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  )
}

export default MedicationTable
