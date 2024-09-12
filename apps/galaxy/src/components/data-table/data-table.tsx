'use client'

import { useEffect, useState } from 'react'
import { Box, Flex, Table } from '@radix-ui/themes'
import {
  flexRender,
  getCoreRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  PaginationState,
  RowSelectionState,
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
  onRowClick?: (row: Row<TData>, table: ReactTable<TData>) => void
  onRowSelectionChange?: (selectedRows: RowSelectionState) => void
  sticky?: boolean
  isRowSpan?: boolean // Use rowspan to prevent table layout issues. Nested columns apply only when the optional `isRowSpan` prop is true, as data tables don't support them directly.
  theadClass?: string
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
  onRowSelectionChange,
  isRowSpan,
  theadClass,
}: DataTableProps<TData, TValue>) => {
  const [sorting, setSorting] = useState<SortingState>([])
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: initialPageSize,
  })
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})

  useEffect(() => {
    if (onRowSelectionChange) {
      onRowSelectionChange(rowSelection)
    }
  }, [rowSelection])

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
          className={cn(
            'bg-pp-focus-bg-2',
            { 'sticky top-0': sticky },
            theadClass,
          )}
        >
          {table.getHeaderGroups().map((headerGroup) => (
            <Table.Row key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                const columnRelativeDepth = header.depth - header.column.depth

                if (
                  !header.isPlaceholder &&
                  columnRelativeDepth > 1 &&
                  header.id === header.column.id
                ) {
                  return null
                }

                let rowSpan = 1
                if (header.isPlaceholder) {
                  const leafs = header.getLeafHeaders()
                  rowSpan = leafs[leafs.length - 1].depth - header.depth
                }

                return (
                  <Table.ColumnHeaderCell
                    key={header.id}
                    rowSpan={isRowSpan ? rowSpan : undefined}
                    colSpan={header.colSpan}
                    className="border-pp-table-border h-5 border border-r-0 px-[2px] py-0 last:border-r"
                  >
                    {!isRowSpan && header.isPlaceholder
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
                  onRowClick?.(row, table)
                }}
                className={cn('hover:bg-gray-2', {
                  'cursor-pointer': onRowClick !== undefined,
                  'bg-pp-focus-bg': row.getIsSelected(),
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
