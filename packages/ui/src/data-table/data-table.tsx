'use client'

import { useState } from 'react'
import { Box, Flex } from '@radix-ui/themes'
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
  useReactTable,
  type ColumnFiltersState,
  type Table as ReactTable,
  type Row,
  type SortingState,
  type VisibilityState,
} from '@tanstack/react-table'
import { cn } from '../cn'
import { Table } from '../table'

interface DataTableProps<TData, TValue> {
  renderHeader?: (table: ReactTable<TData>) => React.ReactNode
  renderFooter?: (table: ReactTable<TData>) => React.ReactNode
  initialPageSize?: 10 | 25 | 50 | 100 | 200
  disablePagination?: boolean
  headerCellClass?: string
  columnCellClass?: string
  tableClass?: string
  tHeadClass?: string
  toBodyClass?: string
  thClass?: string
  meta?: any
  isRowPan?: boolean
  onRowSelect?: (row: Row<TData>, table: ReactTable<TData>) => void
  isPreferredPartnerTable?: boolean
  enableRowSelection?: boolean
  isTreatmentPlan?: boolean
  noResultsComponent?: React.ComponentType
}

const DataTable = ({
  data,
  columns,
  renderHeader,
  renderFooter,
  initialPageSize = 25,
  disablePagination,
  headerCellClass,
  columnCellClass,
  onRowSelect,
  tableClass,
  tHeadClass,
  toBodyClass,
  thClass,
  meta,
  isPreferredPartnerTable = false,
  isRowPan = false,
  enableRowSelection = false,
  isTreatmentPlan = false,
  noResultsComponent: NoResultsComponent,
}: any) => {
  const [sorting, setSorting] = useState<SortingState>([])
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: initialPageSize,
  })
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})

  const [expanded, setExpanded] = useState<ExpandedState>({})
  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onExpandedChange: setExpanded,
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
    enableRowSelection: enableRowSelection,
    meta: meta,
    debugTable: true,
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
    <Flex
      direction="column"
      height="100%"
      justify="between"
      className="z-10 grow"
    >
      <Box>
        {renderHeader ? renderHeader(table) : null}

        <Table.Root
          variant="ghost"
          className={`${tableClass} [&_.rt-ScrollAreaScrollbar]:!hidden [&_.rt-ScrollAreaViewport]:!overflow-hidden`}
        >
          <thead className={`${tHeadClass}`}>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
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
                  const { size, minSize, maxSize } = header.column.columnDef
                  const widthClass = `w-${size || 'auto'}`
                  const minWidthClass = `min-w-${minSize || 'auto'}`
                  const maxWidthClass = `max-w-${maxSize || 'auto'}`
                  const className = cn(
                    widthClass,
                    minWidthClass,
                    maxWidthClass,
                    thClass,
                  )
                  return (
                    <th
                      key={header.id}
                      className={className}
                      colSpan={header.colSpan}
                      rowSpan={isRowPan ? rowSpan : undefined}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                    </th>
                  )
                })}
              </tr>
            ))}
          </thead>
          <Table.Body className={`${toBodyClass}`}>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => {
                return (
                  <Table.Row
                    key={row.id}
                    data-state={row.getIsSelected() && 'selected'}
                    className={cn(
                      isPreferredPartnerTable &&
                        (row.original as { paymentStatus: string })
                          .paymentStatus === 'Failed'
                        ? 'bg-[#ffdae4]'
                        : 'w-20',
                      {
                        'bg-[#D9E2FC]': row.getIsSelected(),
                      },
                    )}
                    onClick={
                      onRowSelect ? () => onRowSelect(row, table) : undefined
                    }
                  >
                    {row.getVisibleCells().map((cell) => {
                      const { size, minSize, maxSize } = cell.column.columnDef
                      const widthClass = `w-${size || 'auto'}`
                      const minWidthClass = `min-w-${minSize || 'auto'}`
                      const maxWidthClass = `max-w-${maxSize || 'auto'}`
                      const className = cn(
                        widthClass,
                        minWidthClass,
                        maxWidthClass,
                        'h-auto',
                        'cursor-pointer',
                        'align-middle',
                        columnCellClass,
                      )
                      return (
                        <Table.Cell
                          key={cell.id}
                          py="1"
                          px="1"
                          className={className}
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          )}
                        </Table.Cell>
                      )
                    })}
                  </Table.Row>
                )
              })
            ) : (
              <Table.Row>
                <Table.Cell colSpan={columns.length}>
                  <Flex align="center" justify="center">
                    {NoResultsComponent && <NoResultsComponent />}
                  </Flex>
                </Table.Cell>
              </Table.Row>
            )}
          </Table.Body>
        </Table.Root>
      </Box>
      {renderFooter ? renderFooter(table) : null}
    </Flex>
  )
}

export { DataTable }
