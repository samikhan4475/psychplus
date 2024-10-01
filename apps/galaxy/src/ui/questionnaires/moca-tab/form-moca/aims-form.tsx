import React from 'react'
import { Flex, Table, Text } from '@radix-ui/themes'
import { MOCA_TABLES } from '../constants'
import { QuestionnairesFormMocaProps } from '../types'
import { QuestionnairesFormMocaDataTable } from './moca-data-table'

const QuestionnairesFormMoca = ({
  labels,
  totalScore,
}: QuestionnairesFormMocaProps) => {
  const numberOfColumns = labels ? labels.length : 1

  return (
    <Flex direction="column" width="100%">
      <Table.Root variant="ghost" size="1" className="w-full">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell width="100%" pl="0">
              <Text weight="medium" size="2">
                {labels?.[0]}
              </Text>
            </Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {MOCA_TABLES.map((table) => {
            const {
              label,
              ScoreInterpretation,
              isRanges,
              isWidthFifty,
              heading,
            } = table
            const tableScore = Object.values(totalScore).reduce(
              (sum, value) => sum + value,
              0,
            )
            return (
              <Table.Row key={label}>
                <Table.Cell colSpan={numberOfColumns} pl="0">
                  <QuestionnairesFormMocaDataTable
                    {...table}
                    totalScore={tableScore}
                    scoreInterpretationRanges={ScoreInterpretation}
                    isRanges={isRanges}
                    isWidthFifty={isWidthFifty}
                    heading={heading}
                  />
                </Table.Cell>
              </Table.Row>
            )
          })}
        </Table.Body>
      </Table.Root>
    </Flex>
  )
}

export { QuestionnairesFormMoca }
