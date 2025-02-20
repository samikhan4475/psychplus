import React from 'react'
import { Box, Flex, Table, Text } from '@radix-ui/themes'
import { cn } from '@psychplus/ui/cn'
import { NoteData } from '@/features/note/types'
import { RadioButton } from './radio-button'

interface QuestionnairesTableProps {
  data: NoteData[]
  labels: string[]
  classNameHeaderCell?: string
  classNameCell?: string
  disabled?: boolean
}

const QuestionnairesTable = ({
  data,
  labels,
  classNameHeaderCell,
  classNameCell,
  disabled = false,
}: QuestionnairesTableProps) => {
  return (
    <Box className="w-full">
      <Table.Root variant="ghost" size="1">
        <Table.Header className={cn(classNameHeaderCell && 'bg-[#F9F9FB]')}>
          <Table.Row className="border-b-0">
            <Table.ColumnHeaderCell width="50%" pl="0">
              <Text weight="medium" size="2">
                {labels?.[0]}
              </Text>
            </Table.ColumnHeaderCell>

            {labels?.slice(1).map((label) => (
              <Table.ColumnHeaderCell
                key={label}
                width={`${50 / (labels.length - 1)}%`}
                className={`text-center ${classNameHeaderCell}`}
              >
                <Text weight="medium" size="2">
                  {label}
                </Text>
              </Table.ColumnHeaderCell>
            ))}
          </Table.Row>
        </Table.Header>

        <Table.Body className="px-7">
          {data.map((item, index) => (
            <Table.Row
              key={item.id}
              className={cn(index % 2 === 1 && 'bg-[#F9F9FB]', 'border-0')}
            >
              <Table.Cell width="50%" className="border-0">
                <Flex align="center" gap="1">
                  <Text weight="medium" size="1">
                    {index + 1}.
                  </Text>
                  <Text weight="medium" size="1">
                    {item.question}
                  </Text>
                </Flex>
              </Table.Cell>
              {item.options?.map((option, colIndex) => (
                <Table.Cell
                  key={`${item.id}-${colIndex}`}
                  width={`${50 / (labels.length - 1)}%`}
                  className={classNameCell}
                >
                  {option.value && (
                    <Flex justify="center" align="center">
                      <RadioButton
                        className="bg-0 rounded-0 border-0"
                        field={`${item.id}`}
                        options={[option]}
                        disabled={disabled}
                      />
                    </Flex>
                  )}
                </Table.Cell>
              ))}
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Box>
  )
}

export { QuestionnairesTable }
