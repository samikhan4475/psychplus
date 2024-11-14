'use client'

import { useCallback, useMemo } from 'react'
import { Flex } from '@radix-ui/themes'
import { Column, Row, type ColumnDef } from '@tanstack/react-table'
import toast from 'react-hot-toast'
import {
  ColumnHeader,
  DataTable,
  DataTablePagination,
  LoadingPlaceholder,
} from '@/components'
import { updateChannelAction } from '../actions'
import { PAGE_SIZE } from '../contants'
import { useStore } from '../store'
import { ActiveComponent, SecureMessage, SecureMessagesTab } from '../types'
import {
  MessageDateTimeCell,
  MessageFromCell,
  MessageStatusCell,
  MessageSubjectCell,
  MessageUserNameCell,
} from './cells'

const SecureMessagesTable = () => {
  const {
    secureMessages,
    setSecureMessages,
    setPreviewSecureMessage,
    loading,
    total,
    next,
    prev,
    page,
    activeTab,
    setActiveComponent,
    jumpToPage,
  } = useStore((state) => state)

  const DataTableFooter = useMemo(() => {
    return (
      <Flex py="2" align="center" width="100%" justify="end">
        <DataTablePagination
          jumpToPage={jumpToPage}
          page={page}
          loading={loading || false}
          className=""
          pageSize={PAGE_SIZE}
          key="pagination"
          total={total}
          prev={prev}
          next={next}
        />
      </Flex>
    )
  }, [secureMessages])

  const columns: ColumnDef<SecureMessage>[] = useMemo(
    () => [
      ...(activeTab !== SecureMessagesTab.SENT &&
      activeTab !== SecureMessagesTab.DRAFT
        ? [
            {
              id: 'status',
              size: 50,
              header: ({ column }: { column: Column<SecureMessage> }) =>
                ColumnHeader({
                  column,
                  label: 'Status',
                  className: 'text-3 font-regular text-black',
                }),
              cell: MessageStatusCell,
            },
          ]
        : []),
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
        size: 100,
        header: ({ column }) =>
          ColumnHeader({
            column,
            label: 'Subject',
            className: 'text-3 font-regular text-black',
          }),
        cell: MessageSubjectCell,
      },
    ],
    [activeTab],
  )

  const onClickSecureMessage = useCallback(
    async (secureMessage: SecureMessage) => {
      setPreviewSecureMessage({ secureMessage, activeTab })

      if (activeTab === SecureMessagesTab.DRAFT) {
        setActiveComponent(ActiveComponent.DRAFT)
      } else {
        setActiveComponent(ActiveComponent.PREVIEW_EMAIL)

        // Update the 'isRead' status for non-SENT messages
        if (activeTab !== SecureMessagesTab.SENT) {
          const channel = secureMessage?.channels?.[0]
          if (!channel?.id || !secureMessage.id) return

          const payload = { ...channel, isRead: true }
          const result = await updateChannelAction(
            secureMessage.id,
            channel.id,
            payload,
          )

          if (result.state === 'error') {
            toast.error('Failed to update channel')
          } else {
            secureMessage.channels[0].isRead = true
            const updatedMessages = secureMessages.map((msg) =>
              msg.id === secureMessage.id ? secureMessage : msg,
            )
            setSecureMessages(updatedMessages)
          }
        }
      }
    },
    [setActiveComponent, setPreviewSecureMessage, activeTab, secureMessages],
  )

  if (loading) {
    return (
      <Flex height="100vh" align="center" justify="center">
        <LoadingPlaceholder />
      </Flex>
    )
  }
  const validSecureMessages = secureMessages.filter(
    (message): message is SecureMessage => message.id !== undefined,
  )
  return (
    <DataTable
      data={validSecureMessages}
      columns={columns}
      tableClass="bg-white mt-4"
      renderFooter={() => DataTableFooter}
      onRowClick={(row: Row<SecureMessage>) =>
        onClickSecureMessage(row.original)
      }
    />
  )
}

export { SecureMessagesTable }
