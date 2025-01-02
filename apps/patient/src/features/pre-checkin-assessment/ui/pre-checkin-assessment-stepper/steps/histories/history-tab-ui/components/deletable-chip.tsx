'use client'

import { cn } from '@psychplus-v2/utils'
import { Flex, IconButton, Text } from '@radix-ui/themes'
import { X } from 'lucide-react'

interface DeletableChipProps {
  className?: string
  content: string
  onDelete: () => void
}

const DeletableChip = ({
  className,
  content,
  onDelete,
}: DeletableChipProps) => {
  return (
    <Flex
      className={cn(
        'bg-pp-table-subRows border-pp-table-subRows rounded-full h-fit border pl-1.5 pr-1',
        className,
      )}
      onClick={(e) => e.stopPropagation()}
      align="center"
      gap="1"
    >
      <Text as="span" className="truncate text-[11px]" weight="medium">
        {content}
      </Text>
      <IconButton
        onClick={onDelete}
        variant="ghost"
        radius="full"
        className="!m-0 h-[14px] w-[14px] !p-0"
        size="1"
        color="gray"
        type="button"
        highContrast
      >
        <X size={10} className="text-pp-black-1" />
      </IconButton>
    </Flex>
  )
}

export { DeletableChip }
