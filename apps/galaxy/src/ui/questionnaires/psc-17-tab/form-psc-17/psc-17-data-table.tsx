import React from 'react'
import { Box, Flex, Table, Text } from '@radix-ui/themes'
import { RadioButton, ScoreInterpretation } from '../../shared'
import { PSC_17_OPTIONS } from '../constants'
import { QuestionnairesPsc17Data, ScoreInterpretationRange } from '../types'

interface QuestionnairesFormSnapIvDatatableProps {
  data: QuestionnairesPsc17Data[]
  totalScore: number
  scoreInterpretationRanges: ScoreInterpretationRange[]
  label?: string
  disabled?: boolean
}

const QuestionnairesFormPsc17DataTable = ({
  data,
  totalScore,
  label,
  scoreInterpretationRanges,
  disabled,
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
              {PSC_17_OPTIONS.map((option, optionIndex) => (
                <Table.Cell
                  key={`${item.id}-${optionIndex}`}
                  className="w-[12.5%] pl-8 align-middle"
                >
                  <RadioButton
                    className="bg-0 rounded-0 border-0"
                    field={`${item.id}`}
                    options={[option]}
                    disabled={disabled}
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
            showScoreLabel={false}
          />
        </Box>
      )}
    </Flex>
  )
}

export { QuestionnairesFormPsc17DataTable }
