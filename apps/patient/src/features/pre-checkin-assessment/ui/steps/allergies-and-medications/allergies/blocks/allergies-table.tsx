import React from 'react'
import { cn, getSlashedDateString } from '@psychplus-v2/utils'
import { Table } from '@radix-ui/themes'
import { EmptyFileIcon, FeatureEmpty } from '@/components-v2'
import { AllergyDataResponse } from '@/features/medications/types'

const ColumnHeader = ({ children }: { children: React.ReactNode }) => (
  <Table.ColumnHeaderCell className="border-pp-gray-2 h-auto border-r py-2 font-medium last:border-r-0">
    {children}
  </Table.ColumnHeaderCell>
)

interface AllergiesTableProps {
  allergies: AllergyDataResponse[]
}
const AllergiesTable = ({ allergies }: AllergiesTableProps) => {
  return (
    <Table.Root variant="surface" size="1" className="w-full">
      <Table.Header className={cn('bg-pp-blue-5')}>
        <Table.Row className="whitespace-nowrap">
          <ColumnHeader>Name</ColumnHeader>
          <ColumnHeader>Severity</ColumnHeader>
          <ColumnHeader>Status</ColumnHeader>
          <ColumnHeader>Reaction</ColumnHeader>
          <ColumnHeader>Observation Date</ColumnHeader>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {allergies.length === 0 ? (
          <Table.Row>
            <Table.Cell colSpan={5} className="border-pp-gray-2 border-r">
              <FeatureEmpty
                description="No Allergies added yet"
                Icon={EmptyFileIcon}
              />
            </Table.Cell>
          </Table.Row>
        ) : (
          allergies.map((row) => (
            <Table.Row key={row.encounterId} className="whitespace-nowrap">
              <Table.Cell className="border-pp-gray-2 border-r">
                {row.allergyName}
              </Table.Cell>
              <Table.Cell className="border-pp-gray-2 border-r">
                {row.severityCode}
              </Table.Cell>
              <Table.Cell className="border-pp-gray-2 border-r">
                {row.archive === 0 ? 'Active' : 'Inactive'}
              </Table.Cell>
              <Table.Cell className="border-pp-gray-2 border-r">
                {row.reaction}
              </Table.Cell>
              <Table.Cell className="border-pp-gray-2">
                {getSlashedDateString(row.onsetBegan)}
              </Table.Cell>
            </Table.Row>
          ))
        )}
      </Table.Body>
    </Table.Root>
  )
}

export default AllergiesTable
