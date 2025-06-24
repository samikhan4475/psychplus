'use client'

import { Flex, Text } from '@radix-ui/themes'
import { cn } from '@psychplus/ui/cn'
import { RadioGroupItem } from './radio-group-item'

interface RadioGroupItemProps {
  option: string
  value: boolean
  disabled?: boolean
}

const RadioGroupToggle = ({ value, option, disabled }: RadioGroupItemProps) => {
  return (
    <Flex
      className={cn(
        'rounded-6 border border-gray-7',
        disabled && 'bg-gray-3',
        String(value) === option &&
          !disabled &&
          'border-[#8DA4EF] bg-[#D9E2FC] text-[#194595]',
      )}
      gap="1"
      px="2"
      align="center"
    >
      <RadioGroupItem
        id={option}
        value={option}
        className="pl-[3px]"
        disabled={disabled}
      >
        <Text weight="medium" className="text-[13px] sm:text-[16px]">{option === 'true' ? 'Yes' : 'No'}</Text>
      </RadioGroupItem>
    </Flex>
  )
}

export { RadioGroupToggle }
