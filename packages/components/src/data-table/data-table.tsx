'use client'

import * as React from 'react'
import { Box, Flex } from '@radix-ui/themes'
import {
  flexRender,
  getCoreRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type ColumnFiltersState,
  type Table as ReactTable,
  type SortingState,
  type VisibilityState,
} from '@tanstack/react-table'
import { Table } from '@psychplus/ui/table'

interface DataTableProps<TData, TValue> {
  data: TData[]
  columns: ColumnDef<TData, TValue>[]
  renderHeader?: (table: ReactTable<TData>) => React.ReactNode
  renderFooter?: (table: ReactTable<TData>) => React.ReactNode
  initialPageSize?: 10 | 25 | 50 | 100 | 200
  disablePagination?: boolean
}

const DataTable = <TData, TValue>({
  data,
  columns,
  renderHeader,
  renderFooter,
  initialPageSize,
  disablePagination,
}: DataTableProps<TData, TValue>) => {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    initialState: {
      pagination: {
        pageSize: disablePagination ? data.length : initialPageSize ?? 25,
      },
    },
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  return (
    <Box>
      {renderHeader ? renderHeader(table) : null}
      <Table.Root variant="surface">
        <Table.Header>
          {table.getHeaderGroups().map((headerGroup) => (
            <Table.Row key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <Table.ColumnHeaderCell key={header.id}>
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
              >
                {row.getVisibleCells().map((cell) => (
                  <Table.Cell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Table.Cell>
                ))}
              </Table.Row>
            ))
          ) : (
            <Table.Row>
              <Table.Cell colSpan={columns.length}>
                <Flex align="center" justify="center" className="h-24">
                  No results.
                </Flex>
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
