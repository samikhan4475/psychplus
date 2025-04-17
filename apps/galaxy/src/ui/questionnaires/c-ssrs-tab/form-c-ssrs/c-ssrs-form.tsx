import React from 'react'
import { Flex, Table, Text } from '@radix-ui/themes'
import { CSSRS_TABLES } from '../constants'
import { QuestionnairesFormCssrsProps } from '../types'
import { QuestionnairesFormCssrsDataTable } from './c-ssrs-data-table'

const QuestionnairesFormCssrs = ({
  labels,
  totalScore,
  disabled,
}: QuestionnairesFormCssrsProps) => {
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
          {CSSRS_TABLES.map((table) => {
            const { label, isRanges, scoreInterpretation } = table
            const tableScore = Math.max(...Object.values(totalScore))
            return (
              <Table.Row key={label}>
                <Table.Cell colSpan={numberOfColumns} pl="0">
                  <QuestionnairesFormCssrsDataTable
                    {...table}
                    totalScore={tableScore}
                    scoreInterpretationRanges={scoreInterpretation}
                    isRanges={isRanges}
                    disabled={disabled}
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

export { QuestionnairesFormCssrs }
