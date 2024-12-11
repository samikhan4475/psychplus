import React from 'react'
import { Box, Flex, Grid, Table, Text } from '@radix-ui/themes'
import { RadioButton, ScoreInterpretation } from '../../shared'
import { QuestionnairesMocaData, ScoreInterpretationRange } from '../types'
import { DelayedRecallTable } from './delayed-recall-table'
import { MemoryTable } from './memory-table'
import { OrientationTable } from './orientation-table'

interface QuestionnairesFormMocaDatatableProps {
  data: QuestionnairesMocaData[]
  totalScore: number
  scoreInterpretationRanges: ScoreInterpretationRange[]
  label: string
  isRanges?: boolean
  isWidthFifty?: boolean
  heading?: string[]
  disabled?: boolean
}

const QuestionnairesFormMocaDataTable = ({
  data,
  totalScore,
  label,
  isRanges,
  isWidthFifty,
  heading,
  scoreInterpretationRanges,
  disabled,
}: QuestionnairesFormMocaDatatableProps) => {
  const renderTableComponent = () => {
    if (!heading || heading.length === 0) return null

    if (heading[0] === 'Date') {
      return <OrientationTable heading={heading} data={data} />
    } else if (heading[0] !== '') {
      return <MemoryTable heading={heading} data={data} />
    } else {
      return <DelayedRecallTable heading={heading} data={data} />
    }
  }

  return (
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

        {heading && heading.length > 0 ? (
          renderTableComponent()
        ) : (
          <Table.Body>
            <Table.Row>
              <Table.Cell colSpan={100} className="pb-0 pr-0 pt-0">
                <Grid
                  columns={isWidthFifty ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)'}
                >
                  {data.map((item, questionIndex) => {
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
                          {item.isGrid ? (
                            <Grid columns="repeat(2, 1fr)" gap="2">
                              {item.options.map((option, optionIndex) => (
                                <Box
                                  key={`${item.id}-${optionIndex}`}
                                  className="mb-2"
                                >
                                  <RadioButton
                                    className="bg-0 rounded-0 border-0"
                                    field={`${item.id}`}
                                    options={[option]}
                                    disabled={disabled}
                                  />
                                </Box>
                              ))}
                            </Grid>
                          ) : (
                            item.options.map((option, optionIndex) => (
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
                            ))
                          )}
                        </Flex>
                      </Box>
                    )
                  })}
                </Grid>
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        )}
      </Table.Root>

      {isRanges && (
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

export { QuestionnairesFormMocaDataTable }
