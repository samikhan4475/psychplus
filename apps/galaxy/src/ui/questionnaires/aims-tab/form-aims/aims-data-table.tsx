import React from 'react'
import { Box, Flex, Table, Text } from '@radix-ui/themes'
import { RadioButton, ScoreInterpretation } from '../../shared'
import { AIMS_DENTAL_STATUS_OPTIONS, AIMS_OPTIONS } from '../constants'
import { QuestionnairesAimsData, ScoreInterpretationRange } from '../types'

interface QuestionnairesFormAimsDatatableProps {
  data: QuestionnairesAimsData[]
  totalScore: number
  scoreInterpretationRanges: ScoreInterpretationRange[]
  label: string
  isRanges?: boolean
  isSameOptions?: boolean
}

const QuestionnairesFormAimsDataTable = ({
  data,
  totalScore,
  label,
  scoreInterpretationRanges,
  isRanges,
  isSameOptions,
}: QuestionnairesFormAimsDatatableProps) => {
  const OPTIONS = isSameOptions ? AIMS_OPTIONS : AIMS_DENTAL_STATUS_OPTIONS
  return (
    <Flex direction="column">
      <Table.Root className="w-full">
        <Table.Header className="bg-[#EEF2F6]">
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
                  {item.boldPart ? (
                    <>
                      <strong>{item.boldPart}</strong>
                      {item.question.replace(item.boldPart, '')}
                    </>
                  ) : (
                    item.question
                  )}
                </Text>
              </Table.Cell>
              {OPTIONS.map((option, optionIndex) => (
                <Table.Cell
                  key={`${item.id}-${optionIndex}`}
                  className={`pl-8 align-middle ${
                    optionIndex === 1 && !isSameOptions
                      ? 'w-[50%]'
                      : 'w-[12.5%]'
                  }`}
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

      {isRanges && (
        <Box mt="2">
          <ScoreInterpretation
            ranges={[{ color: 'green', min: 0, max: 40 }]}
            totalScore={totalScore}
            isRanges={false}
          />
        </Box>
      )}
    </Flex>
  )
}

export { QuestionnairesFormAimsDataTable }
