'use client'

import React from 'react'
import { cn } from '@psychplus-v2/utils'
import { Table } from '@radix-ui/themes'
import { EmptyFileIcon, FeatureEmpty } from '@/components-v2'
import { PatientMedication } from '@/features/medications/types/medications'
import { formatDateManually } from '../utils'

const ColumnHeader = ({ children }: { children: React.ReactNode }) => (
  <Table.ColumnHeaderCell className="border-pp-gray-2 h-auto border-r py-2 font-medium last:border-r-0">
    {children}
  </Table.ColumnHeaderCell>
)

type medicationTableProps = {
  medications: PatientMedication[]
}

const MedicationTable = ({ medications }: medicationTableProps) => {
  return (
    <Table.Root variant="surface" size="1" className="w-full">
      <Table.Header className={cn('bg-pp-blue-5')}>
        <Table.Row className="whitespace-nowrap">
          <ColumnHeader>Drug</ColumnHeader>
          <ColumnHeader>Strength</ColumnHeader>
          <ColumnHeader>Quantity</ColumnHeader>
          <ColumnHeader>Written Date</ColumnHeader>
          <ColumnHeader>End Date</ColumnHeader>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {medications.length === 0 ? (
          <Table.Row>
            <Table.Cell colSpan={5} className="border-pp-gray-2 border-r">
              <FeatureEmpty
                description="No Medication added yet"
                Icon={EmptyFileIcon}
              />
            </Table.Cell>
          </Table.Row>
        ) : (
          medications.map((row) => (
            <Table.Row
              key={row.externalPrescriptionId}
              className="whitespace-nowrap"
            >
              <Table.Cell className="border-pp-gray-2 border-r">
                {row.drugDescription}
              </Table.Cell>
              <Table.Cell className="border-pp-gray-2 border-r">
                {row.medicationDetails.strength}
              </Table.Cell>
              <Table.Cell className="border-pp-gray-2 border-r">
                {row.quantityValue}
              </Table.Cell>
              <Table.Cell className="border-pp-gray-2 border-r">
                {formatDateManually(row.writtenDate)}
              </Table.Cell>
              <Table.Cell className="border-pp-gray-2">
                {formatDateManually(row.endDateTime)}
              </Table.Cell>
            </Table.Row>
          ))
        )}
      </Table.Body>
    </Table.Root>
  )
}

export default MedicationTable
