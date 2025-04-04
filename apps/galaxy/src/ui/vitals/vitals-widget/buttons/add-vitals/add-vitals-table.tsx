'use client'

import { Box, Table } from '@radix-ui/themes'
import { DateTimeCell, LongTextCell, TextCell } from '@/components'
import { cn, formatDateTime } from '@/utils'
import { UnitSystem, VITAL_TABLE_LABELS } from '../../constants'
import { PatientVital } from '../../types'
import { getVitalRowHeightClass, getVitalValue } from '../../utils'

interface AddVitalsTableProps {
  unitSystem: UnitSystem
  data: PatientVital[]
}

const AddVitalsTable = ({ unitSystem, data }: AddVitalsTableProps) => {
  return (
    <Box className="w-full">
      <Table.Root variant="ghost" size="1">
        <Table.Header className="bg-pp-focus-bg-2">
          <Table.Row>
            <Table.ColumnHeaderCell className="border-pp-table-border bg-pp-focus-bg-2 min-w-36 sticky left-0 h-6 border px-1 py-0">
              <TextCell>Vitals</TextCell>
            </Table.ColumnHeaderCell>

            {data?.map((vital, index) => (
              <Table.ColumnHeaderCell
                key={`${vital?.metadata?.createdOn} + ${index}`}
                className="border-pp-table-border h-6 whitespace-nowrap border border-l-0 px-1 py-0"
              >
                <DateTimeCell className="w-24">
                  {formatDateTime(vital?.metadata?.createdOn, false)}
                </DateTimeCell>
              </Table.ColumnHeaderCell>
            ))}
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {Object.values(VITAL_TABLE_LABELS).map((label, index) => (
            <Table.Row
              key={label}
              className={index % 2 === 1 ? 'bg-pp-bg-table-cell' : ''}
            >
              <Table.Cell className="border-pp-table-border bg-white min-w-36 sticky left-0  h-7 max-w-[50px] border border-t-0 px-1 py-0">
                <TextCell className="font-[500]">{label}</TextCell>
              </Table.Cell>
              {data?.map((vital) => (
                <Table.Cell
                  key={`${vital.id}-${label}`}
                  className={cn(
                    'border-pp-table-border h-7 border border-l-0 border-t-0 px-1 py-0',
                    getVitalRowHeightClass(index, data),
                  )}
                >
                  <LongTextCell className="w-24">
                    {getVitalValue(vital, label, unitSystem)}
                  </LongTextCell>
                </Table.Cell>
              ))}
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Box>
  )
}

export { AddVitalsTable }
