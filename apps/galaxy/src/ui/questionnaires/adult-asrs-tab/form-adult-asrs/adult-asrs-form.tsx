import React from 'react'
import { Table, Text } from '@radix-ui/themes'
import { ADULT_ASRS_TABLES } from '../constants'
import { QuestionnairesFormAdultAsrsProps } from '../types'
import { QuestionnairesFormAdultAsrsDataTable } from './adult-asrs-data-table'

const QuestionnairesFormAdultAsrs = ({
  labels,
  totalScore,
  disabled,
}: QuestionnairesFormAdultAsrsProps) => {
  const numberOfColumns = labels ? labels.length : 1

  return (
    <Table.Root variant="ghost" size="1" className="w-full">
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeaderCell width="50%" pl="0">
            <Text weight="medium" size="2">
              {labels?.[0]}
            </Text>
          </Table.ColumnHeaderCell>
          {labels?.slice(1).map((label) => (
            <Table.ColumnHeaderCell
              key={label}
              width={`${50 / (labels.length - 1)}%`}
              className="bg-pp-focus-bg border-pp-table-border h-5 border align-middle "
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
        {ADULT_ASRS_TABLES.map((table) => {
          const { label, id, ScoreInterpretation, subHeading } = table
          const tableScore = totalScore[id]
          return (
            <Table.Row key={label}>
              <Table.Cell colSpan={numberOfColumns} pt="2" p="0">
                <QuestionnairesFormAdultAsrsDataTable
                  {...table}
                  totalScore={tableScore}
                  scoreInterpretationRanges={ScoreInterpretation}
                  disabled={disabled}
                  subHeading={subHeading}
                />
              </Table.Cell>
            </Table.Row>
          )
        })}
      </Table.Body>
    </Table.Root>
  )
}

export { QuestionnairesFormAdultAsrs }
