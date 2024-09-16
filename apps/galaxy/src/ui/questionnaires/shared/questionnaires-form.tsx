import React from 'react'
import * as RadixRadioGroup from '@radix-ui/react-radio-group'
import { Box, Flex, Table, Text } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { cn } from '@/utils'
import {
  ScoreInterpretation,
  ScoreInterpretationRange,
} from './score-interpretation'
import { FormValues } from './use-questionnaire-form'

interface Option {
  value: number
  label: string
}

interface QuestionnairesData {
  question: string
  selectedValue: number
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
  const { getValues, setValue } = useFormContext<FormValues>()

  const handleChange = (index: number, value: number) => {
    setValue(`responses.${index}.selectedValue`, value)
  }

  return (
    <Flex direction="column">
      <Table.Root variant="ghost" size="1">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell className="w-1/3" pl="0">
              <Text weight="bold" size="2">
                {labels[0]}
              </Text>
            </Table.ColumnHeaderCell>
            {labels.slice(1).map((label) => (
              <Table.ColumnHeaderCell key={label} className="pl-6" pr="0">
                <Text weight="bold" size="2">
                  {label}
                </Text>
              </Table.ColumnHeaderCell>
            ))}
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {data.map((item, index) => (
            <Table.Row key={item.question}>
              <Table.Cell
                className={cn(index % 2 === 1 ? 'bg-pp-bg-table-cell' : '')}
              >
                <Flex gap="2">
                  <Text>{index + 1}.</Text>
                  <Text weight="medium" size="1">
                    {item.question}
                  </Text>
                </Flex>
              </Table.Cell>
              {item.options.map((option) => (
                <Table.Cell
                  key={option.value}
                  className={cn(
                    index % 2 === 1 ? 'bg-pp-bg-table-cell' : '',
                    'pl-6 align-middle',
                  )}
                >
                  <RadixRadioGroup.Root
                    onValueChange={() => handleChange(index, option.value)}
                    value={`responses.${index}.selectedValue`}
                    className="flex items-center gap-1"
                  >
                    <RadixRadioGroup.Item
                      className="rounded-full flex h-[12px] w-[12px] items-center justify-center border border-gray-9 data-[state=checked]:border-blue-11 data-[state=checked]:bg-blue-11"
                      value={String(option.value)}
                      checked={
                        getValues(`responses.${index}.selectedValue`) ===
                        option.value
                      }
                    >
                      <RadixRadioGroup.Indicator className="after:bg-white after:rounded-full flex h-full w-full items-center justify-center after:block after:h-[4px] after:w-[4px] after:content-['']" />
                    </RadixRadioGroup.Item>
                    <Flex
                      className={cn(
                        'cursor-pointer items-center',
                        getValues(`responses.${index}.selectedValue`) ===
                          option.value && 'font-bold',
                      )}
                    >
                      {!isNaN(Number(option.label)) &&
                        option.label.trim() !== '' &&
                        option.label.trim() !== '0' && <Text size="1">+</Text>}
                      <Text size="2">{option.label}</Text>
                    </Flex>
                  </RadixRadioGroup.Root>
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

export { QuestionnairesForm, type QuestionnairesData }
