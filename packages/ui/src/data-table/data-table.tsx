'use client'

import { useState } from 'react'
import { Box, Flex } from '@radix-ui/themes'
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
  type SortingState,
  type VisibilityState,
} from '@tanstack/react-table'
import { Table } from '../table'

interface DataTableProps<TData, TValue> {
  data: TData[]
  columns: ColumnDef<TData, TValue>[]
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
  isRowPan?: boolean
  isPreferredPartnerTable?: boolean
  isTreatmentPlan?: boolean
  noResultsComponent?: React.ComponentType;
}

const DataTable = <TData, TValue>({
  data,
  columns,
  renderHeader,
  renderFooter,
  initialPageSize = 25,
  disablePagination,
  headerCellClass,
  columnCellClass,
  tableClass,
  tHeadClass,
  toBodyClass,
  thClass,
  isPreferredPartnerTable = false,
  isRowPan = false,
  isTreatmentPlan = false,
  noResultsComponent: NoResultsComponent,
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

                  return (
                    <th
                      key={header.id}
                      className={`${thClass}`}
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
                    className={
                      isPreferredPartnerTable &&
                      (row.original as { paymentStatus: string })
                        .paymentStatus === 'Failed'
                        ? 'bg-[#ffdae4]'
                        : ''
                    }
                  >
                    {row.getVisibleCells().map((cell) => (
                      <Table.Cell
                        key={cell.id}
                        py="1"
                        px="1"
                        className={`h-auto cursor-pointer align-middle ${columnCellClass}`}
                        onClick={() => {
                          if (isTreatmentPlan && cell.column.id !== 'actions') {
                            const {
                              patientId,
                              noteId,
                              id: rowId,
                            } = row.original as any
                            window.location.replace(
                              `/galaxy/widgets/assessment-and-treatment-plan-detail?patientId=${patientId}&noteId=${noteId}&rowId=${rowId}`,
                            )
                          }
                        }}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </Table.Cell>
                    ))}
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
