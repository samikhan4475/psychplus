import React, { useState } from 'react'
import * as RadioGroup from '@radix-ui/react-radio-group'
import { Box, Table } from '@radix-ui/themes'

const AccordionContent = ({
  questions,
  options,
}: {
  questions: string[]
  options: string[]
}) => {
  const [selectedValues, setSelectedValues] = useState<string[]>(
    Array(questions.length).fill(''),
  )

  const handleValueChange = (qIndex: number, value: string): void => {
    const updatedValues = [...selectedValues]
    updatedValues[qIndex] = value
    setSelectedValues(updatedValues)
  }

  return (
    <Box className="[&_*]:!shadow-none [&_*]:![--table-row-box-shadow:none]">
      <Table.Root variant="ghost" className="[&_table]:shadow-none">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>
              Over the last two weeks, how often have you been bothered by any
              of the following problems?
            </Table.ColumnHeaderCell>
            {options.map((option, index) => (
              <Table.ColumnHeaderCell key={index + option}>
                {option}
              </Table.ColumnHeaderCell>
            ))}
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {questions.map((question, qIndex) => (
            <Table.Row key={qIndex + question} className="even:bg-[#f8f9fb]">
              <Table.RowHeaderCell>
                {qIndex + 1}. {question}
              </Table.RowHeaderCell>
              {options.map((_, oIndex) => (
                <Table.Cell key={oIndex + question}>
                  <RadioGroup.Root
                    aria-label={`Question ${qIndex + 1}`}
                    value={selectedValues[qIndex]}
                    onValueChange={(value) => handleValueChange(qIndex, value)}
                    className="flex justify-center items-center"
                  >
                    <RadioGroup.Item
                      value={`${qIndex}-${oIndex}`}
                      className="relative rounded-full border-gray-400 h-5 w-5 border data-[state=checked]:border-blue-12 data-[state=checked]:bg-blue-12"
                    >
                      <Box className="absolute inset-0 flex items-center justify-center">
                        <Box className="bg-white rounded-full h-2 w-2"></Box>
                      </Box>
                    </RadioGroup.Item>
                  </RadioGroup.Root>
                </Table.Cell>
              ))}
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Box>
  )
}

export default AccordionContent
