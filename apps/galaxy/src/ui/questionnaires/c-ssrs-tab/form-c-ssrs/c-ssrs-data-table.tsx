import React from 'react'
import { Box, Flex, Table, Text } from '@radix-ui/themes'
import {
  RadioButton,
  ScoreInterpretation,
  ScoreInterpretationRange,
} from '../../shared'
import { QuestionnairesCssrsData } from '../types'

interface QuestionnairesFormCssrsDatatableProps {
  data: QuestionnairesCssrsData[]
  totalScore: number
  scoreInterpretationRanges: ScoreInterpretationRange[]
  label: string
  isRanges?: boolean
  disabled?: boolean
}

const QuestionnairesFormCssrsDataTable = ({
  data,
  totalScore,
  label,
  scoreInterpretationRanges,
  isRanges,
  disabled,
}: QuestionnairesFormCssrsDatatableProps) => {
  return (
    <Flex direction="column">
      <Table.Root className="w-full">
        <Table.Header className="bg-pp-bg-table-label">
          <Table.Row>
            <Table.Cell colSpan={6} className="h-fit py-1">
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
              <Table.Cell className="w-[37.5%]">
                <Text weight="medium" size="1">
                  {item.question}
                </Text>
              </Table.Cell>
              {item.options?.map((option, optionIndex) => (
                <Table.Cell
                  key={`${item.id}-${optionIndex}`}
                  className={`pl-8 align-middle ${
                    optionIndex === 1 ? 'w-[50%]' : 'w-[12.5%]'
                  }`}
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

      {isRanges && (
        <Box mt="2">
          <ScoreInterpretation
            ranges={scoreInterpretationRanges}
            totalScore={totalScore}
            isRanges={isRanges}
          />
        </Box>
      )}
    </Flex>
  )
}

export { QuestionnairesFormCssrsDataTable }
