'use client'

import React from 'react'
import { Flex, Text } from '@radix-ui/themes'
import { ColumnDef } from '@tanstack/react-table'
import { format } from 'date-fns'
import { ColumnHeader, DataTable, TextCell } from '@/components'
import { TmsWidgetSchemaType } from '@/ui/procedures/tms-tab/tms-widget-schema'

interface TableDataType {
  dateTime: string
  user: string
  motorThersholdPercent: string
}
const columns: ColumnDef<TableDataType>[] = [
  {
    id: 'label',
    accessorKey: 'label',
    header: ({ column }) => (
      <ColumnHeader column={column} label={'Date/Time'} />
    ),
    cell: ({ row }) => (
      <TextCell>
        {row?.original?.dateTime
          ? format(new Date(row?.original?.dateTime), 'MM/dd/yyyy hh:mm')
          : ''}
      </TextCell>
    ),
  },
  {
    id: 'user',
    accessorKey: 'user',
    header: ({ column }) => <ColumnHeader column={column} label={'User'} />,
    cell: ({ row }) => <TextCell>{row?.original?.user ?? ''}</TextCell>,
  },
  {
    id: 'MT',
    accessorKey: 'MT',
    header: ({ column }) => <ColumnHeader column={column} label={'MT%'} />,
    cell: ({ row }) => (
      <TextCell>{row?.original?.motorThersholdPercent ?? ''}</TextCell>
    ),
  },
]
interface Props<T> {
  data: T
}

const MotorThresholdSection = ({ data }: Props<TmsWidgetSchemaType>) => {
  const tableData =
    data.motorThershold.length > 0 ? [data.motorThershold[0]] : []
  return (
    <Flex direction={'column'} className="my-2">
      <Text className="text-2 font-medium ">
        Motor Threshold Determination (MT):
      </Text>
      <DataTable columns={columns} data={tableData} tableClass={'w-1/2'} />
    </Flex>
  )
}

export { MotorThresholdSection }
