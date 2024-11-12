import { Box, Flex, Table } from '@radix-ui/themes'
import { DateTimeCell } from '@/components'
import { formatDateTime } from '@/utils'
import { VITAL_TABLE_LABELS } from '../types'
import { getFormField } from '../utils'
import { BloodPressureField } from './blood-pressure-field'
import { CancelButton } from './cancel-button'
import { NumberField } from './number-field'
import { SaveButton } from './save-button'

const AddVitalSignsForm = ({
  closeNewRecord,
  generateVitalButtons,
}: {
  closeNewRecord: () => void
  generateVitalButtons: (vitalSigns: []) => void
}) => {
  return (
    <Box>
      <Table.Root variant="ghost" size="1">
        <Table.Header className="bg-pp-focus-bg-2">
          <Table.Row>
            <Table.ColumnHeaderCell className="border-pp-table-border bg-pp-focus-bg-2 h-6 border px-1 py-0">
              <DateTimeCell>
                {formatDateTime(new Date().toISOString(), false)}
              </DateTimeCell>
            </Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {Object.values(VITAL_TABLE_LABELS).map((label, index) => (
            <Table.Row key={label}>
              <Table.Cell className="border-pp-table-border h-7 border px-1 py-0 align-middle">
                {label === VITAL_TABLE_LABELS.bloodPressure ? (
                  <BloodPressureField />
                ) : (
                  <NumberField
                    field={getFormField(label)}
                    className="w-[87px]"
                  />
                )}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>

      <Flex className="shadow-6" gap="2" p="1">
        <CancelButton onCancel={closeNewRecord} />

        <SaveButton
          generateVitalButtons={generateVitalButtons}
          onSave={closeNewRecord}
        />
      </Flex>
    </Box>
  )
}

export { AddVitalSignsForm }
