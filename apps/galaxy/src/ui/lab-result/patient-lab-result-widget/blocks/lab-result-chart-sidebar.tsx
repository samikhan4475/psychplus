'use client'

import { useMemo, useState } from 'react'
import * as Accordion from '@radix-ui/react-accordion'
import { ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons'
import * as RadioGroup from '@radix-ui/react-radio-group'
import { Box, Flex, Text } from '@radix-ui/themes'
import { SelectOptionType } from '@/types'
import { cn } from '@/utils'
import { useLabTestStore, useStore } from '../store'
import { LabResultSubRow } from '../types'
import { getGroupedTestData } from '../utils'

interface LabTestSection {
  title: string
  options: SelectOptionType[]
}
interface ResultByDateEntry {
  resultId: string
  resultValue: string
  observationTime: string
  resultUnit: string
  resultName:string
  recomendedValue: string
  metadata?: {
    createdOn: string
  }
}

interface GroupedTestDataItem {
  testName: string
  subRows: ResultByDateEntry[]
}

interface GroupedResults {
  [resultName: string]: {
    [observationTime: string]: ResultByDateEntry
  }
}

const LabResultChartSidebar = () => {
  const { data } = useStore((state) => ({ data: state.data }))
  const { selectedTestId, setSelectedTest } = useLabTestStore()

  const processedData = getGroupedTestData(data ?? []) as GroupedTestDataItem[]

  const labTestSections: LabTestSection[] = useMemo(() => {
    return processedData.map((test) => {
      const groupedResults: GroupedResults = {}
      test.subRows.forEach((subRow, index) => {
        const resultName = subRow.resultName ?? `Result ${index + 1}`
        const observationTime = subRow.observationTime

        if (!groupedResults[resultName]) {
          groupedResults[resultName] = {}
        }
        const existingResult =
          groupedResults[resultName][observationTime?.toString() ?? '']
        if (observationTime) {
          const verifiedDate =
            existingResult?.metadata &&
            subRow?.metadata &&
            new Date(existingResult.metadata.createdOn) <
              new Date(subRow.metadata.createdOn)

          if (!existingResult || verifiedDate) {
            groupedResults[resultName][observationTime.toString()] = subRow
          }
        }
      })

      const options = Object.keys(groupedResults).map((resultName) => {
        const latestObservation = groupedResults[resultName]
        const timeKeys = Object.keys(latestObservation)
        const latestResult =
          timeKeys.length > 0 ? latestObservation[timeKeys[0]] : null

        if (!latestResult || !latestResult.resultId) {
          return {
            label: resultName,
            value: `missing-id-${resultName}`,
            parentTitle: test.testName,
          }
        }

        return {
          label: resultName,
          value: latestResult.resultId,
          parentTitle: test.testName,
        }
      })

      return {
        title: test.testName,
        options,
      }
    })
  }, [processedData])

  const [activeItems, setActiveItems] = useState<string[]>([
    labTestSections[0]?.title || '',
  ])

  return (
    <Box className="bg-white w-64 border-r border-gray-6">
      <Accordion.Root
        type="multiple"
        value={activeItems}
        onValueChange={(value) => setActiveItems(value)}
      >
        {labTestSections.map((section) => (
          <Accordion.Item key={section.title} value={section.title}>
            <Accordion.Header className="mb-2 flex cursor-pointer justify-between bg-gray-4 p-2 p-[3px]">
              <Accordion.Trigger className="flex w-full items-center justify-between">
                <Text
                  size="1"
                  weight="bold"
                  className="text-left uppercase text-gray-11"
                >
                  {section.title}
                </Text>
                {activeItems.includes(section.title) ? (
                  <ChevronUpIcon
                    width={20}
                    height={20}
                    className="ml-2 text-gray-12"
                  />
                ) : (
                  <ChevronDownIcon
                    width={20}
                    height={20}
                    className="ml-2 text-gray-12"
                  />
                )}
              </Accordion.Trigger>
            </Accordion.Header>

            <Accordion.Content className="p-2">
              <RadioGroup.Root
                value={selectedTestId}
                onValueChange={(val) => {
                  const match = section.options.find((o) => o.value === val)
                  if (match) {
                    setSelectedTest(match.value, section.title, match.label)
                  }
                }}
              >
                <Flex direction="column">
                  {section.options.map((option) => {
                    const isSelected = selectedTestId === option.value

                    return (
                      <Flex
                        key={option.value}
                        align="center"
                        justify="between"
                        className="group"
                      >
                        <Text
                          as="label"
                          htmlFor={option.value}
                          className={cn(
                            'text-sm flex flex-1 cursor-pointer items-center gap-2 rounded-1',
                            {
                              'border border-blue-7 bg-blue-3': isSelected,
                              'hover:bg-gray-2': !isSelected,
                            },
                          )}
                        >
                          <RadioGroup.Item
                            className={cn(
                              'rounded-full flex h-3 w-3 items-center justify-center border',
                              {
                                'border-blue-9 bg-blue-9': isSelected,
                                'border-gray-7': !isSelected,
                              },
                            )}
                            value={option.value}
                            id={option.value}
                          >
                            <RadioGroup.Indicator className="bg-white rounded-full h-1 w-1" />
                          </RadioGroup.Item>

                          <Text
                            size="2"
                            className={cn({
                              'font-medium text-gray-12': isSelected,
                              'text-gray-11': !isSelected,
                            })}
                          >
                            {option.label}
                          </Text>
                        </Text>
                      </Flex>
                    )
                  })}
                </Flex>
              </RadioGroup.Root>
            </Accordion.Content>
          </Accordion.Item>
        ))}
      </Accordion.Root>
    </Box>
  )
}

export default LabResultChartSidebar
