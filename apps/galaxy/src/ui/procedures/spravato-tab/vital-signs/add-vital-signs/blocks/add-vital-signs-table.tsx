import { Box, Table } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { DateTimeCell, TextCell } from '@/components'
import { formatDateTime } from '@/utils'
import { SpravatoWidgetSchemaType } from '../../../spravato-widget-schema'
import { VITAL_TABLE_LABELS } from '../types'
import { getVitalValue } from '../utils'

const AddVitalSignsTable = () => {
  const form = useFormContext<SpravatoWidgetSchemaType>()

  const data = form.watch('vitalSigns')

  return (
    <Box className="w-full">
      <Table.Root variant="ghost" size="1">
        <Table.Header className="bg-pp-focus-bg-2">
          <Table.Row>
            <Table.ColumnHeaderCell className="border-pp-table-border bg-pp-focus-bg-2 sticky left-0 z-10 h-6 border px-1 py-0">
              <TextCell>Vitals</TextCell>
            </Table.ColumnHeaderCell>

            {data?.map((vital, index) => (
              <Table.ColumnHeaderCell
                key={`${vital.vitalSignDateTime}-${index}`}
                className="border-pp-table-border h-6 whitespace-nowrap border border-l-0 px-1 py-0"
              >
                <DateTimeCell>
                  {formatDateTime(vital.vitalSignDateTime, false)}
                </DateTimeCell>
              </Table.ColumnHeaderCell>
            ))}
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {Object.values(VITAL_TABLE_LABELS).map((label, index) => (
            <Table.Row
              key={`${label}-${index}`}
              className={index % 2 === 1 ? 'bg-pp-bg-table-cell' : ''}
            >
              <Table.Cell className="border-pp-table-border bg-white min-w-36 sticky left-0 z-10 h-7 max-w-[50px] border border-t-0 px-1 py-0">
                <TextCell className="font-[590]">{label}</TextCell>
              </Table.Cell>
              {data?.map((vital, index) => (
                <Table.Cell
                  key={`${label}-${index}`}
                  className="border-pp-table-border h-7 whitespace-nowrap border border-l-0 border-t-0 px-1 py-0"
                >
                  <TextCell>{getVitalValue(vital, label)}</TextCell>
                </Table.Cell>
              ))}
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Box>
  )
}

export { AddVitalSignsTable }
