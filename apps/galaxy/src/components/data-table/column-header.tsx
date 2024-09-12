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
    return <CaretSortIcon className="ml-1 h-4 w-4" />
  }
  return {
    asc: <CaretUpIcon className="ml-1 h-4 w-4" />,
    desc: <CaretDownIcon className="ml-1 h-4 w-4" />,
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
      <Flex height="100%" align="center">
        <Text className={cn('text-[11.5px] font-regular', className)}>
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
        onClick={() => onClick?.(column?.id ?? 'unknown')}
        className={cn(
          'text-black !m-0 grow justify-between whitespace-nowrap text-[11.5px] font-regular !outline-none',
          className,
          {
            'cursor-pointer': onClick,
          },
        )}
      >
        {label}
        {renderSortIcon(sortDir)}
      </Button>
    </Flex>
  )
}

export { ColumnHeader }
