'use client'

import { useCallback, useMemo } from 'react'
import { Row, type ColumnDef } from '@tanstack/react-table'
import { ColumnHeader, DataTable } from '@/components'
import { useStore } from '../store'
import {
  ActiveComponent,
  ActiveComponentProps,
  Channel,
  SecureMessage,
} from '../types'
import {
  MessageDateTimeCell,
  MessageFromCell,
  MessageStatusCell,
  MessageSubjectCell,
  MessageUserNameCell,
} from './cells'

const SecureMessagesTable = ({ setActiveComponent }: ActiveComponentProps) => {
  const { secureMessages, setPreviewSecureMessage } = useStore((state) => state)

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
        size: 120,
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
        size: 140,
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
  const handleSecureMessage = useCallback(
    async (secureMessage: SecureMessage) => {
      setPreviewSecureMessage(secureMessage)
      setActiveComponent(ActiveComponent.PREVIEW_EMAIL)
    },
    [setActiveComponent, setPreviewSecureMessage],
  )
  const flattenedMessages = flattenMessages(secureMessages)
  // console.log(flattenedMessages, 'flattenedMessages', secureMessages)
  return (
    <DataTable
      data={flattenedMessages}
      columns={columns}
      tableClass="bg-white mt-4"
      onRowClick={(row: Row<SecureMessage>) =>
        handleSecureMessage(row.original)
      }
    />
  )
}

export { SecureMessagesTable }

const flattenMessages = (
  messages: SecureMessage[],
): (SecureMessage & { channel: Channel })[] => {
  return messages.reduce((acc, message) => {
    const { channels = [] } = message
    return [
      ...acc,
      ...channels.map((channel) => ({
        ...message,
        channel,
      })),
    ]
  }, [] as (SecureMessage & { channel: Channel })[])
}
