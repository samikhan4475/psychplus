'use client'

import React, { useState, useMemo } from 'react'
import { Box, Table, Text } from '@radix-ui/themes'
import { LucideIcon, ChevronUp, ChevronDown, ChevronsUpDown } from 'lucide-react'
import { FeatureEmpty, LoadingPlaceholder } from '@/components-v2'
import { cn } from '@psychplus-v2/utils'

type SortDirection = 'asc' | 'desc' | false

interface SortingState {
  id: string
  desc: boolean
}

interface Column<T> {
  key: string
  label: string
  render?: (row: T) => React.ReactNode
  enableSorting?: boolean
  sortingFn?: (rowA: T, rowB: T, columnId: string) => number
  accessorFn?: (row: T) => string | number | boolean | Date
}

interface DataTableProps<T> {
  columns: Column<T>[]
  data: T[]
  emptyDescription?: string
  EmptyIcon: LucideIcon | React.FC
  getRowKey: (row: T) => string
  loading?: boolean
  enableSorting?: boolean
  defaultSorting?: SortingState[]
  onSortingChange?: (sorting: SortingState[]) => void
}

const DataTable = <T,>({
  columns,
  data,
  emptyDescription = 'No data available',
  EmptyIcon,
  getRowKey,
  loading,
  enableSorting = false,
  defaultSorting = [],
  onSortingChange,
}: DataTableProps<T>) => {
  const [sorting, setSorting] = useState<SortingState[]>(defaultSorting)

  const compareValues = <V,>(aValue: V, bValue: V): number => {
    if (aValue === null && bValue === null) return 0
    if (aValue === null) return -1
    if (bValue === null) return 1

    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return aValue.localeCompare(bValue)
    }
    
    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return aValue - bValue
    }
    
    if (aValue instanceof Date && bValue instanceof Date) {
      return aValue.getTime() - bValue.getTime()
    }
    
    return String(aValue).localeCompare(String(bValue))
  }

  const getCellValue = (row: T, column: Column<T>): React.ReactNode => {
    if (column.render) {
      return column.render(row)
    }
    
    if (column.accessorFn) {
      const value = column.accessorFn(row)
      return value instanceof Date ? value.toLocaleString() : value
    }
    
    const value = row[column.key as keyof T]
    return value instanceof Date ? value.toLocaleString() : (value as React.ReactNode)
  }

  const getColumnValue = (row: T, columnConfig: Column<T>, columnId: string) => {
    return columnConfig.accessorFn 
      ? columnConfig.accessorFn(row)
      : row[columnId as keyof T]
  }

  const compareRows = (rowA: T, rowB: T, sorting: SortingState[]): number => {
    for (const sort of sorting) {
      const columnConfig = columns.find(col => col.key === sort.id)
      if (!columnConfig) continue

      let result = 0

      if (columnConfig.sortingFn) {
        result = columnConfig.sortingFn(rowA, rowB, sort.id)
      } else {
        const aValue = getColumnValue(rowA, columnConfig, sort.id)
        const bValue = getColumnValue(rowB, columnConfig, sort.id)
        result = compareValues(aValue, bValue)
      }

      if (sort.desc) result *= -1

      if (result !== 0) return result
    }

    return 0
  }

  const sortData = (data: T[], sorting: SortingState[]): T[] => {
    if (!enableSorting || sorting.length === 0) return data
    return [...data].sort((rowA, rowB) => compareRows(rowA, rowB, sorting))
  }

  const sortedData = useMemo(() => {
    return sortData(data, sorting)
  }, [data, sorting, enableSorting])

  const handleSort = (column: Column<T>) => {
    if (!enableSorting || column.enableSorting === false) return

    const existingSortIndex = sorting.findIndex(sort => sort.id === column.key)
    let newSorting: SortingState[]

    if (existingSortIndex >= 0) {
      const existingSort = sorting[existingSortIndex]
      if (existingSort.desc) {
        newSorting = sorting.filter(sort => sort.id !== column.key)
      } else {
        newSorting = [
          ...sorting.slice(0, existingSortIndex),
          { id: column.key, desc: true },
          ...sorting.slice(existingSortIndex + 1)
        ]
      }
    } else {
      newSorting = [{ id: column.key, desc: false }]
    }

    setSorting(newSorting)
    onSortingChange?.(newSorting)
  }

  const getColumnSortDirection = (column: Column<T>): SortDirection => {
    if (!enableSorting || column.enableSorting === false) return false
    
    const sortState = sorting.find(sort => sort.id === column.key)
    if (!sortState) return false
    
    return sortState.desc ? 'desc' : 'asc'
  }

  const getSortIcon = (column: Column<T>) => {
    if (!enableSorting || column.enableSorting === false) return null

    const sortDirection = getColumnSortDirection(column)
    
    if (sortDirection === 'asc') {
      return <ChevronUp className="w-4 h-4 ml-1" />
    } else if (sortDirection === 'desc') {
      return <ChevronDown className="w-4 h-4 ml-1" />
    }

    return <ChevronsUpDown className="w-4 h-4 ml-1 opacity-50" />
  }

  const getCanSort = (column: Column<T>) => {
    return enableSorting && column.enableSorting !== false
  }

  const renderEmptyState = () => {
    if (sortedData.length === 0 && loading) {
      return <LoadingPlaceholder />
    }
    
    return <FeatureEmpty description={emptyDescription} Icon={EmptyIcon} />
  }

  const renderTableRows = () => {
    if (sortedData.length === 0) {
      return (
        <Table.Row>
          <Table.Cell
            colSpan={columns.length}
            className="border-pp-gray-2 border-r"
          >
            {renderEmptyState()}
          </Table.Cell>
        </Table.Row>
      )
    }

    return sortedData.map((row) => (
      <Table.Row key={getRowKey(row)} className="whitespace-nowrap">
        {columns.map((col, index) => (
          <Table.Cell 
            key={col.key} 
            className={`border-pp-gray-2 ${
              index > 0 ? 'border-l' : ''
            }`}
          >
            {getCellValue(row, col)}
          </Table.Cell>
        ))}
      </Table.Row>
    ))
  }

  return (
    <Table.Root variant="surface" size="1" className="w-full">
      <Table.Header className="bg-pp-blue-5">
        <Table.Row className="whitespace-nowrap">
          {columns.map((col, index) => (
            <Table.ColumnHeaderCell 
              key={col.key}
              className={cn(
                "text-1 font-[500]",
                index > 0 && "border-l border-pp-gray-2",
                getCanSort(col) && "cursor-pointer select-none"
              )}
              onClick={() => handleSort(col)}
            >
              <Box className="flex items-center justify-between">
                <Text size="1">{col.label}</Text>
                {getSortIcon(col)}
              </Box>
            </Table.ColumnHeaderCell>
          ))}
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {renderTableRows()}
      </Table.Body>
    </Table.Root>
  )
}

export { DataTable }
export type { Column, DataTableProps, SortDirection, SortingState }