import React from 'react'
import { cn, getSlashedDateString } from '@psychplus-v2/utils'
import { Table } from '@radix-ui/themes'
import { EmptyFileIcon, FeatureEmpty } from '@/components-v2'
import { AllergyDataResponse } from '@/features/medications/types'

const ColumnHeader = ({ children }: { children: React.ReactNode }) => (
  <Table.ColumnHeaderCell className="h-auto overflow-clip py-2 text-[12px] font-medium">
    {children}
  </Table.ColumnHeaderCell>
)

interface allergiesTableProps {
  allergies: AllergyDataResponse[]
}
const AllergiesTable = ({ allergies }: allergiesTableProps) => {
  return (
    <Table.Root variant="ghost" size="2" className="w-full">
      <Table.Header className={cn('bg-[#EBF3FC]')}>
        <Table.Row>
          <ColumnHeader>Name</ColumnHeader>
          <ColumnHeader>Severity</ColumnHeader>
          <ColumnHeader>Status</ColumnHeader>
          <ColumnHeader>Reaction</ColumnHeader>
          <ColumnHeader>Observation Date</ColumnHeader>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {allergies.length === 0 && (
          <Table.Row>
            <Table.Cell colSpan={11}>
              <FeatureEmpty
                description="No Allergies added yet"
                Icon={EmptyFileIcon}
              />
            </Table.Cell>
          </Table.Row>
        )}

        {allergies.map((row) => (
          <Table.Row key={row.encounterId}>
            <Table.Cell>{row.allergyName}</Table.Cell>
            <Table.Cell>{row.severityCode}</Table.Cell>
            <Table.Cell>{row.archive === 0 ? 'Active' : 'Inactive'}</Table.Cell>
            <Table.Cell>{row.reaction}</Table.Cell>
            <Table.Cell>{getSlashedDateString(row.onsetBegan)}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  )
}

export default AllergiesTable
