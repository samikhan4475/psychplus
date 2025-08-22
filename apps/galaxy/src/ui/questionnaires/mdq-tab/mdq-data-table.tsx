import React from 'react'
import { Box, Flex, Grid, Table, Text } from '@radix-ui/themes'
import { RadioButton } from '../shared'
import { FOLLOW_UP_QUESTIONS } from './constants'
import { MdqScoreInterpretation } from './score-interpretation'

interface QuestionnairesFormMocaDatatableProps {
  label: string
  totalScore: number
  Q14?: string
  Q15?: string
  isWidthFifty?: boolean
}

const QuestionnairesFormMdqDataTable = ({
  label,
  Q14,
  Q15,
  isWidthFifty,
  totalScore,
}: QuestionnairesFormMocaDatatableProps) => {
  return (
    <>
      <Flex direction="column">
        <Table.Root className="w-full">
          <Table.Header className="bg-pp-bg-table-label">
            <Table.Row>
              <Table.Cell colSpan={6} className="h-fit py-1">
                <Text weight="bold" size="1">
                  {label}
                </Text>
              </Table.Cell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            <Table.Row>
              <Table.Cell colSpan={100} className="pb-0 pr-0 pt-0">
                <Grid
                  columns={isWidthFifty ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)'}
                >
                  {FOLLOW_UP_QUESTIONS.map((item, questionIndex) => {
                    const applyBgClass = isWidthFifty
                      ? [1, 2, 5, 6].includes(questionIndex)
                      : questionIndex % 2 === 1
                    return (
                      <Box
                        key={item.id}
                        className={`${
                          applyBgClass ? 'bg-pp-bg-table-cell' : ''
                        } p-4`}
                      >
                        <Text weight="bold" size="1">
                          {item.question}
                        </Text>
                        <Flex direction="column" className="pt-2">
                          {item.options.map((option, optionIndex) => (
                            <Box
                              key={`${item.id}-${optionIndex}`}
                              className="mb-2"
                            >
                              <RadioButton
                                className="bg-0 rounded-0 border-0"
                                field={`${item.id}`}
                                options={[option]}
                              />
                            </Box>
                          ))}
                        </Flex>
                      </Box>
                    )
                  })}
                </Grid>
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table.Root>
      </Flex>
      <Box mt="2">
        <MdqScoreInterpretation totalScore={totalScore} Q14={Q14} Q15={Q15} />
      </Box>
      <Text size="2" weight="bold">
        Criteria:
      </Text>
      <Flex gap="1" direction="column">
        <Box>
          <Text className="italic">
            1. 7 or more “Yes” responses to the 13 items in Question 1
          </Text>
        </Box>
        <Box>
          <Text className="italic">2. “Yes” to Question 2</Text>
        </Box>
        <Box>
          <Text className="italic">
            3. “Moderate problem” or “Serious problem” in Question 3
          </Text>
        </Box>
      </Flex>
    </>
  )
}

export { QuestionnairesFormMdqDataTable }
