'use client'

import { Fragment, useEffect, useState } from 'react'
import { Box, Flex, Heading, Text, TextField } from '@radix-ui/themes'
import { UseFormReturn } from 'react-hook-form'
import { getSearchTests } from '@psychplus/lab-orders/api.client'
import { Select } from '@psychplus/ui/select'
import { CustomsAccordion } from '.'
import { LabTest } from '../types'
import { RequiredField } from './required-field'

interface QuestionsProps {
  selectedTests: LabTest[]
  form: UseFormReturn<any>
  isEdit: boolean
}

const Questions = ({ selectedTests, form, isEdit }: QuestionsProps) => {
  const [tests, setTests] = useState<LabTest[]>(selectedTests || [])

  useEffect(() => {
    if (isEdit) {
      const testCodes = selectedTests
        .map((test) => test.labTestCode)
        .filter((item): item is string => item !== undefined)

      fetchTests({ testCodes, selectedTests })
    } else {
      setTests(selectedTests)
    }
  }, [selectedTests, isEdit])

  const fetchTests = async ({
    testCodes,
    selectedTests,
  }: {
    testCodes: string[]
    selectedTests: LabTest[]
  }) => {
    try {
      const testsData = await getSearchTests({ testCodes })
      const updatedData =
        testsData.flatMap((item) => {
          const updatedEntries = item.askAtOrderEntries?.map((entry) => {
            const correspondingTest = selectedTests.find((test) =>
              test.labTestAnswers?.some(
                (answer) => answer.questionCode === entry.questionCode,
              ),
            )
            if (correspondingTest) {
              const answer = correspondingTest.labTestAnswers?.find(
                (answer) => answer.questionCode === entry.questionCode,
              )
              return {
                ...entry,
                entryAnswer: answer?.entryAnswer || '',
              }
            }
            return entry
          })

          return {
            ...item,
            testName: item.testName,
            id: item.id,
            askAtOrderEntries: updatedEntries || [],
          }
        }) || []

      setTests(updatedData)
    } catch (error) {
      console.error('Failed to fetch tests data:', error)
    }
  }

  useEffect(() => {
    tests.forEach((test) => {
      test.askAtOrderEntries?.forEach((question) => {
        if (question.controlType === 'OptionSelect' && question.entryAnswer) {
          const key = question.entryAnswer?.split(':')[0]
          if (key) {
            form.setValue(
              `question_${test.testName}_${question.questionCode}`,
              key,
              {
                shouldValidate: true,
                shouldDirty: false,
              },
            )
          }
        }
      })
    })
  }, [tests, form])

  return (
    <Box>
      <Heading
        size="4"
        className="mb-1 font-sans text-[12px] font-medium text-[#000000]"
      >
        Tests Questions
      </Heading>
      {tests.map((test, index) => {
        if (!test?.askAtOrderEntries || test.askAtOrderEntries.length === 0)
          return null
        return (
          <CustomsAccordion
            sno={index}
            type="test"
            key={test.id}
            title={test.testName?.toUpperCase() || 'TestName'}
            // handlerDelete={() => deleteForm(index, form.id)}
          >
            <Flex className="mb-2 mt-2 grid grid-cols-3 gap-4 pl-2 pr-2">
              {test.askAtOrderEntries?.map((question) => (
                <Fragment key={question.id}>
                  {question.controlType === 'FreeText' &&
                    question.questionText && (
                      <Box className="col-span-1">
                        <Flex
                          direction="column"
                          gap="1"
                          className="h-[48px] w-full"
                        >
                          <Text size="1" weight="medium">
                            {question.questionText}
                            {question.isMandatory && <RequiredField />}
                          </Text>
                          <TextField.Root
                            className="h-7 w-full text-[12px]"
                            defaultValue={question.entryAnswer}
                            {...form.register(
                              `question_${test.testName}_${question.questionCode}`,
                            )}
                          />
                        </Flex>
                      </Box>
                    )}
                  {question.controlType === 'OptionSelect' &&
                    question.questionText && (
                      <Box className="col-span-1">
                        <Flex
                          direction="column"
                          gap="1"
                          className="h-[48px] w-full"
                        >
                          <Text size="1" weight="medium">
                            {question.questionText}
                            {question.isMandatory && <RequiredField />}
                          </Text>
                          <Select.Root
                            size="1"
                            defaultValue={question.entryAnswer?.split(':')[0]}
                            onValueChange={(value) => {
                              form.setValue(
                                `question_${test.testName}_${question.questionCode}`,
                                value,
                                {
                                  shouldValidate: true,
                                  shouldDirty: true,
                                },
                              )
                            }}
                          >
                            <Select.Trigger
                              placeholder="Select Role"
                              className="h-[28px] w-full font-light"
                            />
                            <Select.Content>
                              {question.options?.map((option) => {
                                const [key, value] = option.split(':')
                                return (
                                  <Select.Item key={key} value={key}>
                                    {value}
                                  </Select.Item>
                                )
                              })}
                            </Select.Content>
                          </Select.Root>
                        </Flex>
                      </Box>
                    )}

                  {question.controlType === 'date' && question.questionText && (
                    <Box className="col-span-1">
                      <Flex gap="1" direction="column" className="w-full">
                        <Text
                          size="1"
                          weight="medium"
                          className="flex items-start"
                        >
                          {question.questionText}
                          {question.isMandatory && <RequiredField />}
                        </Text>
                        <Box className="relative h-[28px] w-full overflow-hidden border border-t-0 !border-[#cdced6]">
                          <TextField.Root
                            type="date"
                            {...form.register(
                              `question_${test.testName}_${question.questionCode}`,
                            )}
                            defaultValue={question.entryAnswer}
                            className="absolute left-[-12px] top-0 h-[28px] w-[104px] justify-between rounded-2 border border-[#ffff] text-left text-1 text-[12px] font-regular"
                          />
                        </Box>
                      </Flex>
                    </Box>
                  )}
                </Fragment>
              ))}
            </Flex>
          </CustomsAccordion>
        )
      })}
    </Box>
  )
}

export { Questions }
