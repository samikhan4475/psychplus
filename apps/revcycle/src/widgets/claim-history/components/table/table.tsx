'use client'

import { useEffect, useState } from 'react'
import { Box } from '@radix-ui/themes'
import { Column, Row, type ColumnDef, type Table } from '@tanstack/react-table'
import { DataTable, DataTableColumnHeader } from '@psychplus/ui/data-table'
import { TableCellText } from '@psychplus/ui/table-cell'
import { Filter } from '../filter'
import { DataTableFooter } from '../footer'

interface ClaimHistory {
  date: string
  name: string
  section: string
  field: string
  previousValue: string
  currentValue: string
}

interface Dropdown {
  value: string
  label: string
}
interface ColumnData {
  id: string
  title: string
  rowName: string
  editable: boolean
  type: string
  enableHiding: boolean
  dropdownValues?: Dropdown[]
}

interface ClaimColumns {
  tablePageSize: number
  manualPagination: boolean
  columns: ColumnData[]
}

const claimHistory: ClaimColumns = {
  tablePageSize: 25,
  manualPagination: true,
  columns: [
    {
      id: 'dateTime',
      title: 'Date Time',
      rowName: 'dateTime',
      editable: false,
      type: 'text',
      enableHiding: false,
    },
    {
      id: 'name',
      title: 'Name',
      rowName: 'name',
      editable: false,
      type: 'text',
      enableHiding: false,
    },
    {
      id: 'section',
      title: 'Section',
      rowName: 'section',
      editable: false,
      type: 'text',
      enableHiding: false,
    },
    {
      id: 'field',
      title: 'Field',
      rowName: 'field',
      editable: false,
      type: 'text',
      enableHiding: false,
    },
    {
      id: 'prev',
      title: 'Previous Value',
      rowName: 'prev',
      editable: false,
      type: 'text',
      enableHiding: false,
    },
    {
      id: 'current',
      title: 'Current Value',
      rowName: 'current',
      editable: false,
      type: 'text',
      enableHiding: false,
    },
  ],
}

const WidgetTable = () => {
  const [columns, setColumns] = useState<ColumnDef<ClaimHistory>[]>([])
  const [pageRecords, setPageRecords] = useState([])
  const renderFooter = (table: Table<ClaimHistory>) => (
    <DataTableFooter table={table} />
  )

  const getRecords = () => {
    // TODO: Fetch API needed to integerate
  }

  const headerFunction = (
    column: Column<ClaimHistory, unknown>,
    col: ColumnData,
  ) => <DataTableColumnHeader column={column} title={col.title} />
  const cellFunction = (row: Row<ClaimHistory>, col: ColumnData) => (
    <TableCellText text={`${row.original[col.rowName as keyof unknown]}`} />
  )

  useEffect(() => {
    setPageRecords([])
    const tempColumns: ColumnDef<ClaimHistory>[] = []
    claimHistory.columns.forEach((col) => {
      tempColumns.push({
        ...col,
        header: ({ column }) => headerFunction(column, col),
        cell: ({ row }) => cellFunction(row, col),
      })
    })

    setColumns(tempColumns)
  }, [])

  return (
    <Box mt="3">
      <Filter search={getRecords} />
      <DataTable
        data={pageRecords}
        columns={columns}
        renderFooter={renderFooter}
        initialPageSize={10}
        tableClass="border border-solid border-[lightgray] mt-5"
        tHeadClass="bg-[#EBF3FC]"
        thClass=" text-center"
        columnCellClass="text-center"
      />
    </Box>
  )
}

export { WidgetTable }
