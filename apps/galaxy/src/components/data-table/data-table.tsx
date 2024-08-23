'use client'

import { useState } from 'react'
import { Box, Flex, Table } from '@radix-ui/themes'
import {
  flexRender,
  getCoreRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  PaginationState,
  useReactTable,
  type ColumnDef,
  type ColumnFiltersState,
  type Table as ReactTable,
  type Row,
  type SortingState,
  type VisibilityState,
} from '@tanstack/react-table'
import { cn } from '@/utils'

interface DataTableProps<TData, TValue> {
  data: TData[]
  columns: ColumnDef<TData, TValue>[]
  renderHeader?: (table: ReactTable<TData>) => React.ReactNode
  renderFooter?: (table: ReactTable<TData>) => React.ReactNode
  initialPageSize?: 10 | 25 | 50 | 100 | 200
  disablePagination?: boolean
  renderEmpty?: () => React.ReactNode
  onRowClick?: (row: Row<TData>) => void
  sticky?: boolean
}

const DataTable = <TData, TValue>({
  data,
  columns,
  renderHeader,
  renderFooter,
  initialPageSize = 50,
  disablePagination,
  renderEmpty,
  onRowClick,
  sticky,
}: DataTableProps<TData, TValue>) => {
  const [sorting, setSorting] = useState<SortingState>([])
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: initialPageSize,
  })
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: disablePagination
      ? undefined
      : getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onPaginationChange: setPagination,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination,
    },
  })

  return (
    <Box>
      {renderHeader ? renderHeader(table) : null}
      <Table.Root
        variant="ghost"
        size="1"
        className={cn('rounded-[0px]', {
          'border-collapse [&_.rt-ScrollAreaRoot]:!overflow-visible [&_.rt-ScrollAreaViewport]:!overflow-visible':
            sticky,
        })}
      >
        <Table.Header
          className={cn('bg-pp-focus-bg-2', { 'sticky top-0': sticky })}
        >
          {table.getHeaderGroups().map((headerGroup) => (
            <Table.Row key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <Table.ColumnHeaderCell
                    key={header.id}
                    className="border-pp-table-border h-5 border border-r-0 px-[2px] py-0 last:border-r"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </Table.ColumnHeaderCell>
                )
              })}
            </Table.Row>
          ))}
        </Table.Header>
        <Table.Body>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <Table.Row
                key={row.id}
                data-state={row.getIsSelected() && 'selected'}
                onClick={() => {
                  onRowClick?.(row)
                }}
                className={cn('hover:bg-gray-2', {
                  'cursor-pointer': onRowClick !== undefined,
                })}
              >
                {row.getVisibleCells().map((cell) => (
                  <Table.Cell
                    key={cell.id}
                    className="border-pp-table-border h-5 border-b border-l border-r-0 p-0 last:border-r"
                  >
                    <Flex height="100%" align="center">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </Flex>
                  </Table.Cell>
                ))}
              </Table.Row>
            ))
          ) : (
            <Table.Row>
              <Table.Cell colSpan={columns.length}>
                {renderEmpty ? (
                  renderEmpty()
                ) : (
                  <Flex align="center" justify="center">
                    No results
                  </Flex>
                )}
              </Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table.Root>
      {renderFooter ? renderFooter(table) : null}
    </Box>
  )
}

export { DataTable }
