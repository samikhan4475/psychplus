import React from 'react'
import { Flex, Table, Text } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { CheckboxCell } from '@/components'
import { QuestionnairesMocaData } from '../types'

const OrientationTable = ({
  heading,
  data,
}: {
  heading: string[]
  data: QuestionnairesMocaData[]
}) => {
    const { watch, setValue } = useFormContext()

  const handleCheckboxChange = (field: string, value: boolean) => {
    setValue(field, value ? '1' : '0')
  }

  return (
    <>
      <Flex direction="column" className="p-3">
        <Text weight="bold" size="1">
          {data[0].question}
        </Text>

        <Text size="1" className="pt-2">
          {data[0].description}
        </Text>
      </Flex>
      <Flex className="p-3 pt-0" direction="column">
        <Table.Body>
          <Table.Row className="bg-gray-3">
            {heading.map((header, index) => (
              <Table.ColumnHeaderCell
                key={header}
                className="border-pp-table-border bg-pp-focus-bg-2 h-5 w-[105px] border border-r-0 px-1 py-0.5 last:border-r"
              >
                <Text weight="medium" size="1">
                  {header}
                </Text>
              </Table.ColumnHeaderCell>
            ))}
          </Table.Row>
          <Table.Row>
            {heading.map((heading, colIndex) => {
              const fieldKey = `Orientation${heading}Q1`
              return (
                <Table.Cell
                  key={`col-${heading}-${colIndex}`}
                  className="border-pp-table-border h-5 border-b border-l border-r-0 px-1 py-0.5 last:border-r"
                >
                  <Flex>
                    <CheckboxCell
                      label={watch(fieldKey) === '1' ? 'Yes' : 'No'}
                      checked={watch(fieldKey) === '1'}
                      onCheckedChange={(checked) =>
                        handleCheckboxChange(fieldKey, checked)
                      }
                    />
                  </Flex>
                </Table.Cell>
              )
            })}
          </Table.Row>
        </Table.Body>
        <Text size="1" className="pt-3">
          1 point per checkmark
        </Text>
      </Flex>
    </>
  )
}

export { OrientationTable }
