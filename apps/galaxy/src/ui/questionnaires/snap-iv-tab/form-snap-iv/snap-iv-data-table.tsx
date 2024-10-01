import React from 'react'
import { Box, Flex, Table, Text } from '@radix-ui/themes'
import { RadioButton, ScoreInterpretation } from '../../shared'
import { SNAP_IV_OPTIONS } from '../constants'
import { QuestionnairesSnapIvData, ScoreInterpretationRange } from '../types'

interface QuestionnairesFormSnapIvDatatableProps {
  data: QuestionnairesSnapIvData[]
  totalScore: number
  scoreInterpretationRanges: ScoreInterpretationRange[]
  label: string
}

const QuestionnairesFormSnapIvDataTable = ({
  data,
  totalScore,
  label,
  scoreInterpretationRanges,
}: QuestionnairesFormSnapIvDatatableProps) => {
  return (
    <Flex direction="column">
      <Table.Root className="w-full">
        <Table.Header className="bg-pp-bg-table-label">
          <Table.Row>
            <Table.Cell colSpan={5} className="h-fit py-1">
              <Text weight="medium" size="1">
                {label}
              </Text>
            </Table.Cell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {data.map((item, questionIndex) => (
            <Table.Row
              key={item.id}
              className={questionIndex % 2 === 1 ? 'bg-pp-bg-table-cell' : ''}
            >
              <Table.Cell className="w-[50%]">
                <Text weight="medium" size="1">
                  {item.question}
                </Text>
              </Table.Cell>
              {SNAP_IV_OPTIONS.map((option, optionIndex) => (
                <Table.Cell
                  key={`${item.id}-${optionIndex}`}
                  className="w-[12.5%] pl-8 align-middle"
                >
                  <RadioButton
                    className="bg-0 rounded-0 border-0"
                    field={`${item.id}`}
                    options={[option]}
                  />
                </Table.Cell>
              ))}
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>

      {scoreInterpretationRanges && (
        <Box mt="2">
          <ScoreInterpretation
            ranges={scoreInterpretationRanges}
            totalScore={totalScore}
          />
        </Box>
      )}
    </Flex>
  )
}

export { QuestionnairesFormSnapIvDataTable }
