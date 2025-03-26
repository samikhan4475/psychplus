'use client'

import { Flex, ScrollArea } from '@radix-ui/themes'
import { ColumnDef } from '@tanstack/react-table'
import {
  ColumnHeader,
  DataTable,
  LoadingPlaceholder,
  TextCell,
} from '@/components'
import { GeneratedReportTablePagination } from './generated-report-table-pagination'
import { useStore } from './store'
import { formatHeader, parseGeneratedReport } from './utils'

const generateColumns = (headers: string[]): ColumnDef<any>[] => {
  return headers.map((header) => ({
    accessorKey: header,
    header: ({ column }) => (
      <ColumnHeader column={column} label={formatHeader(header)} />
    ),
    cell: ({ row }) => <TextCell>{row.original[header]}</TextCell>,
  }))
}

const GeneratedReport = () => {
  const { generatedReport, generateReportLoading } = useStore((state) => ({
    generatedReport: state.generatedReport,
    generateReportLoading: state.generateReportLoading,
  }))
  if (!generatedReport) return
  const { headers, data } = parseGeneratedReport(generatedReport)
  const columns = generateColumns(headers)

  if (generateReportLoading) {
    return (
      <Flex
        height="100%"
        align="center"
        justify="center"
        width="100%"
        className="h-[600px]"
      >
        <LoadingPlaceholder />
      </Flex>
    )
  }
  return (
    <Flex direction="column" className="bg-white overflow-hidden">
      <ScrollArea className="bg-white mb-0 rounded-1 p-1">
        <DataTable columns={columns} data={data} sticky disablePagination />
      </ScrollArea>
      <GeneratedReportTablePagination />
    </Flex>
  )
}

export { GeneratedReport }
