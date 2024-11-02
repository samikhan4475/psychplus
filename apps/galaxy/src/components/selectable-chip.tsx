'use client'

import { Flex, Text, Tooltip } from '@radix-ui/themes'
import { cn } from '@/utils'

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
      className={cn('select-none text-[11px]', {
        'font-medium': selected,
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
          'h-[var(--chip-height)] cursor-pointer rounded-1 border border-gray-9 py-[1px]',
          {
            'bg-pp-focus-bg border-pp-focus-outline': selected,
          },
        )}
      >
        {isTooltip ? (
          <Tooltip content={tooltipContent}>{chipContent}</Tooltip>
        ) : (
          chipContent
        )}
      </Flex>
      {children}
    </>
  )
}

export { SelectableChip }
