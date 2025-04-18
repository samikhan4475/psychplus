import React from 'react'
import { Table, Text } from '@radix-ui/themes'
import { PSC_17_TABLES } from '../constants'
import { QuestionnairesFormPsc17Props } from '../types'
import { QuestionnairesFormPsc17DataTable } from './psc-17-data-table'

const QuestionnairesFormPsc17 = ({
  labels,
  totalScore,
  disabled,
}: QuestionnairesFormPsc17Props) => {
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
        {PSC_17_TABLES.map((table) => {
          const { label, id, ScoreInterpretation } = table
          const tableScore = totalScore[id]
          return (
            <Table.Row key={label}>
              <Table.Cell colSpan={numberOfColumns} pl="0">
                <QuestionnairesFormPsc17DataTable
                  {...table}
                  totalScore={tableScore}
                  scoreInterpretationRanges={ScoreInterpretation}
                  disabled={disabled}
                />
              </Table.Cell>
            </Table.Row>
          )
        })}
      </Table.Body>
    </Table.Root>
  )
}

export { QuestionnairesFormPsc17 }
