import React from 'react'
import { Table } from '@radix-ui/themes'
import { LucideIcon } from 'lucide-react'
import { FeatureEmpty, LoadingPlaceholder } from '@/components-v2'

interface Column<T> {
  key: string
  label: string
  render?: (row: T) => React.ReactNode
}

interface CommonTableProps<T> {
  columns: Column<T>[]
  data: T[]
  emptyDescription?: string
  EmptyIcon: LucideIcon | React.FC
  getRowKey: (row: T) => string
  loading?: boolean
}

const CommonTable = <T,>({
  columns,
  data,
  emptyDescription = 'No data available',
  EmptyIcon,
  getRowKey,
  loading,
}: CommonTableProps<T>) => {
  return (
    <Table.Root variant="surface" size="1" className="w-full">
      <Table.Header className="bg-pp-blue-5">
        <Table.Row className="whitespace-nowrap">
          {columns.map((col) => (
            <Table.ColumnHeaderCell className="text-1 font-[500]" key={col.key}>
              {col.label}
            </Table.ColumnHeaderCell>
          ))}
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {data.length === 0 ? (
          <Table.Row>
            <Table.Cell
              colSpan={columns.length}
              className="border-pp-gray-2 border-r"
            >
              {data.length === 0 && loading ? (
                <LoadingPlaceholder />
              ) : (
                <FeatureEmpty description={emptyDescription} Icon={EmptyIcon} />
              )}
            </Table.Cell>
          </Table.Row>
        ) : (
          data.map((row) => (
            <Table.Row key={getRowKey(row)} className="whitespace-nowrap">
              {columns.map((col) => (
                <Table.Cell key={col.key} className="border-pp-gray-2 border-r">
                  {col.render
                    ? col.render(row)
                    : (row[col.key as keyof T] as React.ReactNode)}
                </Table.Cell>
              ))}
            </Table.Row>
          ))
        )}
      </Table.Body>
    </Table.Root>
  )
}

export { CommonTable }
