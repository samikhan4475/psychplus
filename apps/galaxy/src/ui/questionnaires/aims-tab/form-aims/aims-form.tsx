import React from 'react'
import { Flex, Table, Text } from '@radix-ui/themes'
import { AimsFooter } from '../aims-footer'
import { AIMS_TABLES } from '../constants'
import { QuestionnairesFormAimsProps } from '../types'
import { QuestionnairesFormAimsDataTable } from './aims-data-table'

const QuestionnairesFormAims = ({
  labels,
  totalScore,
}: QuestionnairesFormAimsProps) => {
  const numberOfColumns = labels ? labels.length : 1

  return (
    <Flex direction="column">
      <Table.Root variant="ghost" size="1" className="w-full">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell width="37.5%" pl="0">
              <Text weight="medium" size="2">
                {labels?.[0]}
              </Text>
            </Table.ColumnHeaderCell>
            {labels?.slice(1).map((label) => (
              <Table.ColumnHeaderCell
                key={label}
                className="w-[12.5%] pl-6"
                pr="0"
              >
                <Text weight="medium" size="2">
                  {label}
                </Text>
              </Table.ColumnHeaderCell>
            ))}
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {AIMS_TABLES.map((table) => {
            const { label, ScoreInterpretation, isRanges, isSameOptions } =
              table
            const tableScore = Object.values(totalScore).reduce(
              (sum, value) => sum + value,
              0,
            )
            return (
              <Table.Row key={label}>
                <Table.Cell colSpan={numberOfColumns} pl="0">
                  <QuestionnairesFormAimsDataTable
                    {...table}
                    totalScore={tableScore}
                    scoreInterpretationRanges={ScoreInterpretation}
                    isRanges={isRanges}
                    isSameOptions={isSameOptions}
                  />
                </Table.Cell>
              </Table.Row>
            )
          })}
        </Table.Body>
      </Table.Root>
      <AimsFooter />
    </Flex>
  )
}

export { QuestionnairesFormAims }
