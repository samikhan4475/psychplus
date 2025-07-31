import React from 'react'
import { Table, Text } from '@radix-ui/themes'
import { RadioButton } from '../shared'
import { OPTIONS } from './constants'

interface QuestionnairesFormYBocsDataTableProps {
  id: string
  question: string
  labels: string[]
  disabled?: boolean
}

const QuestionnairesFormYBocsDataTable = ({
  id,
  question,
  labels,
  disabled = false,
}: QuestionnairesFormYBocsDataTableProps) => {
  return (
    <Table.Root variant="ghost" size="1" className="w-full">
      <Table.Header className="bg-pp-bg-table-label">
        <Table.Row className="align-middle">
          <Table.Cell className="w-[30%]">
            <Text weight="bold" size="2" color="red">
              {labels[0]}
            </Text>
          </Table.Cell>
          {labels?.slice(1).map((label) => (
            <Table.Cell key={label} className="w-[14%]">
              <Text weight="medium" size="2">
                {label}
              </Text>
            </Table.Cell>
          ))}
        </Table.Row>
      </Table.Header>

      <Table.Body>
        <Table.Row key={id}>
          <Table.Cell className="w-[30%]">
            <Text weight="medium" size="1">
              {question}
            </Text>
          </Table.Cell>
          {OPTIONS.map((option, optionIndex) => (
            <Table.Cell
              key={`${id}-${optionIndex}`}
              className="w-[14%] align-middle"
            >
              <RadioButton
                className="bg-0 rounded-0 border-0"
                field={`${id}`}
                options={[option]}
                disabled={disabled}
              />
            </Table.Cell>
          ))}
        </Table.Row>
      </Table.Body>
    </Table.Root>
  )
}

export { QuestionnairesFormYBocsDataTable }
