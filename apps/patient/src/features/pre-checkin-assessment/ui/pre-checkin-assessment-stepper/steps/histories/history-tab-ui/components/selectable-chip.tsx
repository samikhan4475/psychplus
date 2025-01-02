'use client'

import { cn } from '@psychplus-v2/utils'
import { Flex, Text, Tooltip } from '@radix-ui/themes'

interface SelectableChipProps {
  label: string
  selected: boolean
  onClick: () => void
  isTooltip?: boolean
  tooltipContent?: string
}

const SelectableChip = ({
  label,
  selected,
  children,
  onClick,
  isTooltip = false,
  tooltipContent,
}: React.PropsWithChildren<SelectableChipProps>) => {
  const chipContent = (
    <Text
      className={cn('select-none text-[14px]', {
        bg: '#194595',
      })}
    >
      {label}
    </Text>
  )

  return (
    <>
      <Flex
        px="1"
        onClick={onClick}
        align="center"
        className={cn(
          'h-[var(--chip-height)] cursor-pointer rounded-2 border border-[#E3EBF6] bg-[#F7F9FC] px-2 py-1',
          {
            'text-white bg-[#194595]': selected,
          },
        )}
      >
        {isTooltip ? (
          <Tooltip content={tooltipContent ?? ''}>{chipContent}</Tooltip>
        ) : (
          chipContent
        )}
      </Flex>
      {children}
    </>
  )
}

export { SelectableChip }
