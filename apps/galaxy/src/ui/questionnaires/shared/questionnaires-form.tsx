import React from 'react'
import { Box, Flex, Table, Text } from '@radix-ui/themes'
import { cn } from '@/utils'
import { RadioButton } from './radio-button'
import {
  ScoreInterpretation,
  ScoreInterpretationRange,
} from './score-interpretation'

interface Option {
  value: string
  label: string
}

interface QuestionnairesData {
  id: string
  question: string
  value: number
  options: Option[]
}

interface QuestionnairesFormProps {
  data: QuestionnairesData[]
  labels: string[]
  totalScore: number
  scoreInterpretationRanges: ScoreInterpretationRange[]
}

const QuestionnairesForm = ({
  data,
  labels,
  totalScore,
  scoreInterpretationRanges,
}: QuestionnairesFormProps) => {
  return (
    <Box className="w-full">
      <Table.Root variant="ghost" size="1">
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
                pl="5"
              >
                <Text weight="medium" size="2">
                  {label}
                </Text>
              </Table.ColumnHeaderCell>
            ))}
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {data.map((item, index) => (
            <Table.Row
              key={item.id}
              className={cn(index % 2 === 1 && 'bg-pp-bg-table-cell')}
              align="center"
            >
              <Table.Cell width="50%" pl="0">
                <Flex gap="1">
                  <Text weight="medium" size="1">
                    {index + 1}.
                  </Text>
                  <Text weight="medium" size="1">
                    {item.question}
                  </Text>
                </Flex>
              </Table.Cell>
              {item.options.map((option, colIndex) => {
                return (
                  <Table.Cell
                    key={`${item.id}-${colIndex}`}
                    width={`${50 / (labels.length - 1)}%`}
                    pl="5"
                  >
                    {option.label && option.value && (
                      <RadioButton
                        className="bg-0 rounded-0 border-0"
                        field={`${item.id}`}
                        options={[option]}
                      />
                    )}
                  </Table.Cell>
                )
              })}
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
    </Box>
  )
}

export { QuestionnairesForm, type QuestionnairesData }
