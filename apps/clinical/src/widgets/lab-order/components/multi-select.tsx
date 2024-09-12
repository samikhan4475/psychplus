import React, { useEffect, useState } from 'react'
import { Cross1Icon } from '@radix-ui/react-icons'
import { Box, Flex, Text } from '@radix-ui/themes'
import './scrollbar.css'
import { cn } from '@psychplus/ui/cn'
import { Tooltip } from '@psychplus/ui/tooltip'
import { CustomMultiSelectInterface } from '../types'
import { RequiredField } from './required-field'

const CustomMultiSelect = ({
  optionKey,
  defaultSelected,
  handleRemoveOption,
  label,
  className,
  code,
  code1,
}: CustomMultiSelectInterface) => {
  const [isScrollable, setIsScrollable] = useState(false)

  useEffect(() => {
    if (defaultSelected.length >= 4) {
      setIsScrollable(true)
    } else {
      setIsScrollable(false)
    }
  }, [defaultSelected])

  return (
    <Box className={className}>
      <Text
        size="1"
        weight="medium"
        className="flex items-start pb-1 text-[#000000]"
      >
        {label} <RequiredField />
      </Text>
      <Box
        className={cn(
          'border',
          'border-[#DDDDE3]',
          'flex',
          'items-center',
          'rounded-3',
          'overflow-x-auto',
          'overflow-y-hidden',
          'w-[610px] gap-[4px] p-[0px_4px_0px_4px]',
          isScrollable ? 'scrollable h-[47px]' : 'h-[30px]',
        )}
      >
        {defaultSelected.map((option: any) => {
          let displayText = null
          const optionValue = `${option[code] ?? option[code1]} - ${
            option[optionKey]
          }`

          if (optionValue) {
            if (optionValue.length < 10) {
              displayText = optionValue
            } else {
              displayText = optionValue.slice(0, 10) + '...'
            }
          }
          return option[optionKey] ? (
            <Box
              key={option[optionKey]}
              className={`ml-1 inline-flex cursor-pointer rounded-[12px] border border-[#B9BBC6] bg-[#D9E2FC] p-[2px_8px_2px_8px]`}
            >
              <Flex gap="1" align="center" justify="between" width="100%">
                <Tooltip
                  content={optionValue || ''}
                  delayDuration={250}
                  className="max-w-[200px]"
                >
                  <Text size="1" weight="regular" className="whitespace-nowrap">
                    {displayText}
                  </Text>
                </Tooltip>
                <Cross1Icon
                  onClick={() => handleRemoveOption(option)}
                  scale="1"
                  className="h-[8.8px] w-[8.8px]"
                />
              </Flex>
            </Box>
          ) : null
        })}
      </Box>
    </Box>
  )
}

export { CustomMultiSelect }
