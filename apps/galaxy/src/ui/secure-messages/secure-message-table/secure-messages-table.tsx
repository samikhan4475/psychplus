'use client'

import { useMemo } from 'react'
import { type ColumnDef } from '@tanstack/react-table'
import { ColumnHeader, DataTable } from '@/components'
import { useStore } from '../store'
import { SecureMessage } from '../types'
import {
  MessageDateTimeCell,
  MessageFromCell,
  MessageStatusCell,
  MessageSubjectCell,
  MessageUserNameCell,
} from './cells'

const SecureMessagesTable = () => {
  const { secureMessages } = useStore((state) => state)

  const columns: ColumnDef<SecureMessage>[] = useMemo(
    () => [
      {
        id: 'status',
        size: 50,

        header: ({ column }) =>
          ColumnHeader({
            column,
            label: 'Status',
            className: 'text-3 font-regular text-black',
          }),
        cell: MessageStatusCell,
      },
      {
        id: 'from',
        size: 50,

        header: ({ column }) =>
          ColumnHeader({
            column,
            label: 'From',
            className: 'text-3 font-regular text-black',
          }),
        cell: MessageFromCell,
      },
      {
        id: 'name',
        size: 100,
        header: ({ column }) =>
          ColumnHeader({
            column,
            label: 'Name',
            className: 'text-3 font-regular text-black',
          }),
        cell: MessageUserNameCell,
      },
      {
        id: 'datatime',
        size: 100,
        header: ({ column }) =>
          ColumnHeader({
            column,
            label: 'Date/Time',
            className: 'text-3 font-regular text-black',
          }),
        cell: MessageDateTimeCell,
      },
      {
        id: 'subject',
        size: 200,
        header: ({ column }) =>
          ColumnHeader({
            column,
            label: 'Subject',
            className: 'text-3 font-regular text-black',
          }),
        cell: MessageSubjectCell,
      },
    ],
    [],
  )

  return (
    <DataTable
      data={secureMessages}
      columns={columns}
      tableClass="bg-white mt-4 w-[552px]"
    />
  )
}

export { SecureMessagesTable }
