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
  useReactTable,
  type ColumnDef,
  type ColumnFiltersState,
  type Row,
  type SortingState,
  type VisibilityState,
} from '@tanstack/react-table'
import { cn } from '@psychplus/ui/cn'
import { Table } from '@psychplus/ui/table'

interface DataTableProps<TData, TValue> {
  data: TData[]
  columns: ColumnDef<TData, TValue>[]
  disablePagination?: boolean
  headerCellsStyles?: string
  bodyRowStyles?: string
  rowId?: string
  onRowSelect: (arg: Row<TData>) => void
}

const HistoryTable = <TData, TValue>({
  data,
  columns,
  disablePagination,
  headerCellsStyles,
  bodyRowStyles,
  rowId,
  onRowSelect,
}: DataTableProps<TData, TValue>) => {
  const [sorting, setSorting] = useState<SortingState>([])
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
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  return (
    <Flex
      grow="1"
      direction="column"
      justify="between"
      className="h-[1px] w-full"
    >
      <Box className="h-[100%] w-[100%] overflow-y-scroll pr-1 [&::-webkit-scrollbar-thumb]:bg-[#CAD8FD] [&::-webkit-scrollbar]:[width:10px]">
        <Table.Root
          variant="ghost"
          className="w-[100%] bg-[#FFFFFF] [box-shadow:0.4px_0_0_0_#0134DB72] [&_.rt-ScrollAreaScrollbar]:!hidden [&_.rt-ScrollAreaViewport]:!overflow-hidden"
        >
          <Table.Header>
            {table.getHeaderGroups().map((headerGroup) => (
              <Table.Row key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <Table.ColumnHeaderCell
                      key={header.id}
                      className={`h-auto px-1 py-1 ${headerCellsStyles ?? ''}`}
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
                  onClick={() => onRowSelect(row)}
                  className={`${
                    row.id === rowId ? 'bg-[#EEF2F6] font-bold' : 'bg-[#FFFF]'
                  } ${bodyRowStyles ?? ''}`}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <Table.Cell
                      key={cell.id}
                      py="1"
                      px="1"
                      className={cn(
                        'font-inherit h-auto border-collapse align-middle font-[500] [box-shadow:inset_0_0_0_0.1px_#0134DB72]',
                        { 'font-[700]': row.id === rowId },
                      )}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </Table.Cell>
                  ))}
                </Table.Row>
              ))
            ) : (
              <Table.Row>
                <Table.Cell colSpan={columns.length}>
                  <Flex align="center" justify="center">
                    No results.
                  </Flex>
                </Table.Cell>
              </Table.Row>
            )}
          </Table.Body>
        </Table.Root>
      </Box>
    </Flex>
  )
}

export { HistoryTable }
