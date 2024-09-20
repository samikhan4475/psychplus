'use client'

import {
  CaretDownIcon,
  CaretSortIcon,
  CaretUpIcon,
} from '@radix-ui/react-icons'
import { Button, Flex, Text } from '@radix-ui/themes'
import { type Column, type SortDirection } from '@tanstack/react-table'
import { cn } from '@/utils'

const renderSortIcon = (sortDir?: SortDirection) => {
  if (!sortDir) {
    return <CaretSortIcon className="text-pp-text-sub h-4 w-4" />
  }
  return {
    asc: <CaretUpIcon className="text-pp-text-sub h-4 w-4" />,
    desc: <CaretDownIcon className="text-pp-text-sub h-4 w-4" />,
  }[sortDir]
}

interface ColumnHeaderProps<TData, TValue> {
  column?: Column<TData, TValue>
  label: string
  className?: string
  sortable?: boolean
  sortDir?: SortDirection
  onClick?: (column: string) => void
}

const ColumnHeader = <TData, TValue>({
  column,
  className,
  label,
  sortable,
  sortDir,
  onClick,
}: ColumnHeaderProps<TData, TValue>) => {
  if (!sortable) {
    return (
      <Flex
        height="100%"
        align="center"
        justify={column?.columns?.length ? 'center' : 'start'}
        px="1"
        className="py-0.5"
      >
        <Text
          className={cn('text-pp-black-3 whitespace-nowrap', className)}
          weight="medium"
          size="1"
        >
          {label}
        </Text>
      </Flex>
    )
  }

  return (
    <Flex
      height="100%"
      align="center"
      width="100%"
      justify={column?.columns?.length ? 'center' : 'start'}
      overflow="hidden"
    >
      <Button
        size="1"
        variant="ghost"
        color="gray"
        type="button"
        onClick={() => onClick?.(column?.id ?? 'unknown')}
        className={cn(
          'text-pp-black-3 !m-0 h-full grow justify-between whitespace-nowrap px-1 py-0.5 font-medium !outline-none',
          {
            'cursor-pointer': onClick,
          },
          className,
        )}
      >
        {label}
        {renderSortIcon(sortDir)}
      </Button>
    </Flex>
  )
}

export { ColumnHeader }
