import React from 'react'
import { Box, Flex, Text } from '@radix-ui/themes'
import { NoteData } from '@/features/note/types'
import { RadioButton } from '../shared/radio-button'

interface QuestionnaireTableProps {
  data: NoteData[]
  labels?: string[]
  disabled?: boolean
  questionsPerRow?: number
}

const MocaTable = ({
  data,
  labels = [],
  disabled = false,
  questionsPerRow = 3,
}: QuestionnaireTableProps) => {
  const rows = Array.from(
    { length: Math.ceil(data.length / questionsPerRow) },
    (_, rowIndex) =>
      data.slice(rowIndex * questionsPerRow, (rowIndex + 1) * questionsPerRow),
  )

  return (
    <Box className="w-full">
      <Flex>
        {labels.map((label, index) => (
          <Box
            key={label}
            className={index === 0 ? 'w-1/2' : 'flex-1 text-left'}
          >
            <Text weight="medium" size="2" className="line-clamp-4">
              {label}
            </Text>
          </Box>
        ))}
      </Flex>

      {rows.map((rowItems, rowIndex) => (
        <Box key={`row-${rowItems.length}-${rowIndex}`} className="mb-4">
          {rowItems.some((item) => item.headingLabels) && (
            <Flex my="2" className="w-full rounded-1 bg-[#EEF2F6] px-2 py-1">
              {rowItems.map((item) =>
                item.headingLabels?.map((label) => (
                  <Text
                    key={`${item.id}-${label}`}
                    className="text-[13px] font-medium"
                  >
                    {label}
                  </Text>
                )),
              )}
            </Flex>
          )}

          <Flex className="space-x-9 px-2 py-1">
            {rowItems.map((item) => (
              <Flex key={item.id} className="w-1/2" gap="1">
                <Text className="text-[13px]">
                  {item.question.split('.')[0]}.
                </Text>
                <Text
                  className="text-[13px]"
                  dangerouslySetInnerHTML={{
                    __html: item.question.split('.')[1],
                  }}
                />
              </Flex>
            ))}
          </Flex>

          {Array.from(
            {
              length: Math.max(
                ...rowItems.map((item) => item.options?.length || 0),
              ),
            },
            (_, optionIndex) => (
              <Flex
                key={`option-${rowIndex}-${optionIndex}`}
                className="space-x-9 px-2 py-1"
              >
                {rowItems.map((item) => (
                  <Box key={`${item.id}-${optionIndex}`} className="flex w-1/2">
                    {item.options?.[optionIndex]?.value && (
                      <RadioButton
                        field={item.id}
                        options={[item.options[optionIndex]]}
                        disabled={disabled}
                      />
                    )}
                  </Box>
                ))}
              </Flex>
            ),
          )}
        </Box>
      ))}
    </Box>
  )
}

export { MocaTable }
