'use client'

import { Flex, Text } from '@radix-ui/themes'
import { cn } from '@/utils'

interface SelectableChipProps {
  label: string
  selected: boolean
  onClick: () => void
}

const SelectableChip = ({
  label,
  selected,
  children,
  onClick,
}: React.PropsWithChildren<SelectableChipProps>) => {
  return (
    <Flex align="center" className="h-[var(--chip-height)]">
      <Flex
        px="1"
        onClick={onClick}
        className={cn(
          'cursor-pointer rounded-1 border border-gray-9 py-[1px]',
          {
            'bg-pp-focus-bg border-pp-focus-outline': selected,
          },
        )}
      >
        <Text
          className={cn('select-none text-[11px]', {
            'font-medium': selected,
          })}
        >
          {label}
        </Text>
      </Flex>
      {children}
    </Flex>
  )
}

export { SelectableChip }
