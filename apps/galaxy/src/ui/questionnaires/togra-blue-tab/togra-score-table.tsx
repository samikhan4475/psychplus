import React from 'react'
import { Flex, Table, Text } from '@radix-ui/themes'
import { ScoreItem } from './types'

interface QuestionnairesFormAimsDatatableProps {
  data: ScoreItem[]
}

const TograScoreTable = ({ data }: QuestionnairesFormAimsDatatableProps) => {
  return (
    <Flex direction="column">
      <Table.Root className="w-full">
        <Table.Header className="bg-pp-bg-table-label">
          <Table.Row>
            <Table.Cell className="h-fit py-1">
              <Text weight="medium" size="1">
                Name
              </Text>
            </Table.Cell>
            <Table.Cell className="h-fit py-1">
              <Text weight="medium" size="1">
                Value
              </Text>
            </Table.Cell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {data.map((item) => (
            <Table.Row key={item.name}>
              <Table.Cell className="w-[37.5%]">
                <Text weight="medium" size="1">
                  {item.name}
                </Text>
              </Table.Cell>
              <Table.Cell className="w-[37.5%]">
                <Text weight="medium" size="1">
                  {item.value}
                </Text>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Flex>
  )
}

export { TograScoreTable }
