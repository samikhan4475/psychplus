import React from 'react'
import { Box, Flex, Text } from '@radix-ui/themes'
import { cn } from '@psychplus/ui/cn'
import { isMobile } from '@psychplus/utils/client'
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
      <Flex className="w-full gap-x-4">
        <Box className="w-1/2">
          <Text weight="medium" size="2" className="line-clamp-6">
            {labels?.[0]}
          </Text>
        </Box>

        <Flex className="w-1/2 gap-x-4">
          {labels?.slice(1).map((label) => {
            const isSingleWord = label.trim().split(/\s+/).length === 1
            return (
              <Box key={label} className="flex-1 text-center">
                <Text
                  weight="medium"
                  size="2"
                  className={
                    isSingleWord
                      ? 'line-clamp-6 break-all'
                      : 'line-clamp-6 break-words'
                  }
                >
                  {label}
                </Text>
              </Box>
            )
          })}
        </Flex>
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
                className="w-full gap-x-4 rounded-1 bg-[#EEF2F6] px-2 py-1"
                align="center"
              >
                <Flex className="w-1/2">
                  <Text className="text-[13px]" weight="medium">
                    {item.headingLabels?.[0]}
                  </Text>
                </Flex>
                {item.headingLabels?.slice(1)?.map((label) => (
                  <Flex
                    key={label}
                    className="flex-1 justify-center text-center"
                  >
                    <Text
                      className={cn(
                        'line-clamp-8 text-[13px]',
                        isMobile() && 'break-all',
                      )}
                      weight="medium"
                    >
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
