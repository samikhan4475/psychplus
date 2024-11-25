'use client'

import { Flex, Text, Tooltip } from '@radix-ui/themes'
import { cn } from '@/utils'

interface SelectableChipProps {
  label: string
  selected: boolean
  onClick: () => void
  isTooltip?: boolean
  tooltipContent?: string
  editable?: boolean
}

const SelectableChip = ({
  label,
  selected,
  children,
  onClick,
  isTooltip = false,
  tooltipContent,
  editable = true,
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
          'h-[var(--chip-height)] rounded-1 border border-gray-9 py-[1px]',
          {
            'cursor-pointer': editable,
          },
          {
            'cursor-not-allowed border-gray-7 bg-gray-3': !editable,
          },
          {
            'bg-pp-focus-bg border-pp-focus-outline': selected && editable,
          },
          {
            'border-black bg-gray-3': selected && !editable,
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
