'use client'

import { Flex, Text } from '@radix-ui/themes'
import { cn } from '@/utils'

interface QuestionnairesSelectableChipProps {
  label: string
  selected: boolean
  onClick: () => void
}

const QuestionnairesSelectableChip = ({
  label,
  selected,
  children,
  onClick,
}: React.PropsWithChildren<QuestionnairesSelectableChipProps>) => {
  return (
    <Flex align="center" className="h-[var(--chip-height)]">
      <Flex
        px="1"
        onClick={onClick}
        className={cn(
          'rounded-full cursor-pointer border border-gray-9 px-2 py-[1px]',
          {
            'bg-pp-focus-bg border-pp-focus-bg ': selected,
          },
        )}
      >
        <Text
          size="2"
          className={cn('select-none', {
            'font-bold': selected,
          })}
        >
          {label}
        </Text>
      </Flex>
      {children}
    </Flex>
  )
}

export { QuestionnairesSelectableChip }
