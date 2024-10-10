'use client'

import { useEffect, useState } from 'react'
import {
  CaretDownIcon,
  CaretSortIcon,
  CaretUpIcon,
} from '@radix-ui/react-icons'
import { Box, Button, Flex, Text } from '@radix-ui/themes'
import { Table, type Column, type SortDirection } from '@tanstack/react-table'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/utils'
import { ProviderCoding } from '../types'

const renderSortIcon = (sortDir?: SortDirection | false) => {
  if (!sortDir) {
    return <CaretSortIcon className="text-pp-text-sub h-4 w-4" />
  }
  return {
    asc: <CaretUpIcon className="text-pp-text-sub h-4 w-4" />,
    desc: <CaretDownIcon className="text-pp-text-sub h-4 w-4" />,
  }[sortDir]
}

interface ArrowButtonProps {
  direction: 'left' | 'right'
  onClick?: () => void
  sortable?: boolean
}

const ArrowButton = ({ direction, onClick, sortable }: ArrowButtonProps) => {
  const icon =
    direction === 'left' ? (
      <ChevronLeft className="h-4 w-4" />
    ) : (
      <ChevronRight className="h-4 w-4" />
    )

  return (
    <Box
      onClick={onClick}
      className={`bg-white flex h-full items-center justify-center `}
    >
      {icon}
    </Box>
  )
}

interface ColumnHeaderProps<TData, TValue> {
  column?: Column<TData, TValue>
  label: string
  className?: string
  table?: Table<ProviderCoding>
  sortable?: boolean
  sortDir?: SortDirection
  onClick?: (column: string) => void
  clientSideSort?: boolean
}

const ToggleVisibilityColumnHeader = <TData, TValue>({
  column,
  className,
  label,
  table,
  sortable,
  sortDir,
  onClick,
  clientSideSort,
}: ColumnHeaderProps<TData, TValue>) => {
  const [arrowDirection, setArrowDirection] = useState<'right' | 'left'>('left')

  const toggleColumnsVisibility = (isVisible: boolean) => {
    if (column?.columns?.length) {
      column.columns.forEach((col) => col.toggleVisibility(isVisible))
    } else if (table) {
      table.getAllColumns().forEach((col) => {
        col.toggleVisibility(isVisible)
      })
    }
  }

  useEffect(() => {
    toggleColumnsVisibility(false)
  }, [column, table])

  const handleColumns = (action: 'show' | 'remove') => {
    if (action === 'show') {
      toggleColumnsVisibility(true)
      setArrowDirection('left')
    } else {
      toggleColumnsVisibility(false)
      setArrowDirection('right')
    }
  }

  if (!sortable && !clientSideSort) {
    return (
      <Flex
        height="100%"
        align="center"
        justify={column?.columns?.length ? 'center' : 'start'}
        px="1"
        className="py-0.5"
      >
        <Text
          className={cn(
            'text-pp-black-3 flex-grow-[0.95] whitespace-nowrap',
            className,
          )}
          weight="medium"
          size="1"
        >
          {label}
        </Text>
        <Box >
          <ArrowButton
            direction={arrowDirection}
            onClick={() =>
              handleColumns(arrowDirection === 'right' ? 'show' : 'remove')
            }
            sortable={false}
          />
        </Box>
      </Flex>
    )
  }

  const clientSideSortDir = column?.getIsSorted()
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
        onClick={() => {
          clientSideSort
            ? column?.toggleSorting(clientSideSortDir === 'asc')
            : onClick?.(column?.id ?? 'unknown')
        }}
        className={cn(
          'text-pp-black-3 !m-0 h-full flex-grow-[0.95] grow justify-between whitespace-nowrap px-1 py-0.5 font-medium !outline-none',
          {
            'cursor-pointer': onClick,
          },
          className,
        )}
      >
        {label}
        {renderSortIcon(sortDir || (clientSideSort && clientSideSortDir))}
      </Button>
      <Box className="h-full">
        <ArrowButton
          direction={arrowDirection}
          onClick={() =>
            handleColumns(arrowDirection === 'right' ? 'show' : 'remove')
          }
          sortable={true}
        />
      </Box>
    </Flex>
  )
}

export { ToggleVisibilityColumnHeader }
