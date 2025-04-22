import React from 'react'
import { Box, Flex, Text } from '@radix-ui/themes'
import { cn } from '@psychplus/ui/cn'
import { NoteData } from '@/features/note/types'
import { RadioButton } from './radio-button'

interface QuestionnaireTableProps {
  data: NoteData[]
  labels: string[]
  disabled?: boolean
  showNumbering?: boolean
  externalNumbering?: boolean
}

const QuestionnaireTable = ({
  data,
  labels,
  disabled = false,
  showNumbering = true,
  externalNumbering = false,
}: QuestionnaireTableProps) => {
  let questionNumber = 1
  return (
    <Box className="w-full">
      <Flex>
        <Box className="w-1/2">
          <Text weight="medium" size="2" className="line-clamp-4">
            {labels?.[0]}
          </Text>
        </Box>
        {labels?.slice(1).map((label) => (
          <Box key={label} className="flex-1 justify-center text-center">
            <Text weight="medium" size="2" className="line-clamp-4">
              {label}
            </Text>
          </Box>
        ))}
      </Flex>

      {data.map((item, index) => {
        const shouldResetNumbering = !!item.headingLabels
        if (externalNumbering && shouldResetNumbering) {
          questionNumber = 1
        }

        const currentNumber = questionNumber
        if (item.options?.length) {
          questionNumber++
        }

        return (
          <Box key={item.id}>
            {item.headingLabels && (
              <Flex
                my="2"
                className="w-full rounded-1 bg-[#EEF2F6] px-2 py-1"
                align="center"
              >
                <Flex className="w-1/2">
                  <Text className="text-center text-[13px]" weight="medium">
                    {item.headingLabels?.[0]}
                  </Text>
                </Flex>
                {item.headingLabels?.slice(1)?.map((label) => (
                  <Flex
                    key={label}
                    className="flex-1 justify-center text-center"
                  >
                    <Text className="line-clamp-4 text-[13px]" weight="medium">
                      {label}
                    </Text>
                  </Flex>
                ))}
              </Flex>
            )}
            <Flex
              className={cn(
                'items-center border-0 py-2',
                index % 2 === 1 ? 'bg-[#F9F9FB]' : '',
              )}
            >
              <Box className="w-1/2 pl-2">
                <Flex gap="1">
                  {showNumbering && (
                    <Text className="text-[13px]">
                      {externalNumbering ? currentNumber : index + 1}.
                    </Text>
                  )}
                  <Text
                    className="text-[13px]"
                    dangerouslySetInnerHTML={{ __html: item.question }}
                  />
                </Flex>
              </Box>
              {item.options?.map((option, colIndex) => (
                <Box
                  key={`${item.id}-${colIndex}`}
                  className="flex flex-1 items-center justify-center text-center"
                >
                  {option.value && (
                    <RadioButton
                      field={`${item.id}`}
                      options={[option]}
                      disabled={disabled}
                    />
                  )}
                </Box>
              ))}
            </Flex>
          </Box>
        )
      })}
    </Box>
  )
}

export { QuestionnaireTable }
