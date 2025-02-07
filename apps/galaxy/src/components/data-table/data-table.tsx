'use client'

import { useEffect, useState } from 'react'
import { Box, Flex, Table } from '@radix-ui/themes'
import {
  ExpandedState,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
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
  initialPageSize?: 10 | 20 | 30 | 25 | 50 | 100 | 200
  disablePagination?: boolean
  renderEmpty?: () => React.ReactNode
  onRowClick?: (row: Row<TData>, table: ReactTable<TData>) => void
  onRowSelectionChange?: (rows: Row<TData>[]) => void
  sticky?: boolean
  isRowSpan?: boolean // Use rowspan to prevent table layout issues. Nested columns apply only when the optional `isRowSpan` prop is true, as data tables don't support them directly.
  theadClass?: string
  isRowDisabled?: (row: Row<TData>) => boolean
  thClass?: string
  tdClass?: string
  tableClass?: string
  tableRowClass?: string
  selectFirstRow?: boolean
  stickyRow?: boolean
  defaultSorting?: SortingState
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
  thClass,
  tdClass,
  tableClass,
  selectFirstRow,
  tableRowClass,
  stickyRow = false,
  isRowDisabled,
  defaultSorting = [],
}: DataTableProps<TData, TValue>) => {
  const [sorting, setSorting] = useState<SortingState>(defaultSorting)
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: initialPageSize,
  })
  const initialRowSelection: RowSelectionState = selectFirstRow
    ? { 0: true }
    : {}
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState(initialRowSelection)
  const [expanded, setExpanded] = useState<ExpandedState>({})

  useEffect(() => {
    if (onRowSelectionChange) {
      onRowSelectionChange(table.getSelectedRowModel().flatRows)
    }
  }, [rowSelection])

  useEffect(() => {
    setPagination((prev) => ({ ...prev, pageSize: initialPageSize }))
  }, [initialPageSize])

  const table = useReactTable({
    data,
    columns,
    onExpandedChange: setExpanded,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getSubRows: (row: TData) => (row as { subRows?: TData[] }).subRows,
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
    getExpandedRowModel: getExpandedRowModel(),
    state: {
      expanded,
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
        className={cn(tableClass, 'rounded-[0px]', {
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
              {headerGroup.headers.map((header, index) => {
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
                    className={cn(
                      'border-pp-table-border border-t-pp-gray-2 h-5 border border-r-0 p-0',
                      {
                        'border-b-0': header.colSpan > 1,
                        'last:border-r-pp-gray-2 first:border-l-pp-gray-2 first:rounded-tl-1 last:rounded-tr-1 last:border-r':
                          header.depth <= 1,
                        'border-t-pp-table-border': header.depth > 1,
                        'bg-pp-focus-bg-2 sticky left-0 z-10':
                          stickyRow && index === 0,
                      },
                      `w-[${header.getSize()}px]`,
                      thClass,
                    )}
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
                className={cn(
                  tableRowClass,
                  'group/row-hover hover:bg-gray-2',
                  {
                    'cursor-pointer': onRowClick !== undefined,
                    '!bg-pp-table-subRows': row.getIsSelected(),
                    'bg-pp-table-subRows hover:bg-pp-table-subRows':
                      row.depth > 0,
                    'bg-gray-5 hover:bg-gray-5': isRowDisabled?.(row),
                  },
                )}
              >
                {row.getVisibleCells().map((cell, index) => (
                  <Table.Cell
                    key={cell.id}
                    className={cn(
                      'border-pp-table-border last:border-r-pp-gray-2 first:border-l-pp-gray-2 group-last/row-hover:!border-b-pp-gray-2 h-5 border-b border-l border-r-0 px-1 py-0.5 last:border-r group-last/row-hover:first:rounded-bl-1 group-last/row-hover:last:rounded-br-1',
                      {
                        'bg-white sticky left-0 z-10': stickyRow && index === 0,
                      },
                      tdClass,
                    )}
                  >
                    <Flex height="100%" align="center" width="100%">
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
