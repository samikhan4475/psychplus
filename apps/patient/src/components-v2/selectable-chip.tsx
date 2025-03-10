'use client'

import { cn } from '@psychplus-v2/utils'
import { Flex, Tooltip } from '@radix-ui/themes'
import { BlockLabel } from './block-label'

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
  const chipContent = <BlockLabel>{label}</BlockLabel>

  return (
    <Flex className="flex flex-wrap items-start">
      <Flex
        px="1"
        onClick={onClick}
        align="center"
        className={cn(
          'h-8 cursor-pointer rounded-6 border border-gray-8 bg-[white] px-2 py-1',
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
      <Flex className="flex min-w-0 grow flex-wrap gap-2">{children}</Flex>
    </Flex>
  )
}

export { SelectableChip }
