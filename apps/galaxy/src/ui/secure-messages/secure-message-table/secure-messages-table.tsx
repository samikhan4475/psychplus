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
import { useStore as globalStore } from '@/store'
import { useStore as useMessagesStore } from '../../messages/store'
import { updateChannelAction } from '../actions'
import { PAGE_SIZE } from '../contants'
import { useStore } from '../store'
import {
  ActiveComponent,
  Channel,
  SecureMessage,
  SecureMessagesTab,
} from '../types'
import { sortOnLastMessage } from '../utils'
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
    setActiveComponent,
    jumpToPage,
  } = useStore((state) => ({
    secureMessages: state.secureMessages,
    setSecureMessages: state.setSecureMessages,
    setPreviewSecureMessage: state.setPreviewSecureMessage,
    loading: state.loading,
    total: state.total,
    next: state.next,
    prev: state.prev,
    page: state.page,
    setActiveComponent: state.setActiveComponent,
    jumpToPage: state.jumpToPage,
  }))
  const { activeTab, unreadCount, setUnreadCount } = useMessagesStore(
    (state) => ({
      activeTab: state.activeTab,
      unreadCount: state.unreadCount,
      setUnreadCount: state.setUnreadCount,
    }),
  )
  const user = globalStore((state) => state.user)

  const DataTableFooter = useMemo(() => {
    return (
      <Flex p="2" align="center" width="100%" justify="end">
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
            label:
              activeTab === SecureMessagesTab.DRAFT ||
              activeTab === SecureMessagesTab.SENT
                ? 'To'
                : 'From',
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
        id: 'data-time',
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
      setPreviewSecureMessage({
        secureMessage,
        activeTab: activeTab as SecureMessagesTab,
      })

      if (activeTab === SecureMessagesTab.DRAFT) {
        setActiveComponent(ActiveComponent.DRAFT)
      } else {
        setActiveComponent(ActiveComponent.PREVIEW_EMAIL)
        if (activeTab === SecureMessagesTab.INBOX) {
          const conversation = secureMessage.secureMessageConversations || []
          const hasConversation = conversation?.length
          let channel: Channel | undefined

          const ownChannels: Channel[] = []
          let channelsToUpdate: Channel[] = []
          if (hasConversation) {
            conversation
              .slice()
              .reverse()
              .forEach((c) =>
                c?.channels.some((ch) => {
                  const matched = ch.receiverUserId === user.id
                  if (matched) ownChannels.push(ch)
                  return matched
                }),
              )
            channelsToUpdate = ownChannels.filter(
              (ch) => !ch.isRead && ch.receiverUserId === user.id,
            )
          } else {
            channel = secureMessage?.channels?.find(
              (channel) => channel.receiverUserId === user.id,
            )
            if (channel?.id) {
              channelsToUpdate.push(channel)
            }
          }
          if (!channelsToUpdate?.length || !secureMessage.id) return

          const responses = await Promise.all(
            channelsToUpdate.map((ch) => {
              const payload = { ...ch, isRead: true }
              return updateChannelAction(secureMessage.id, ch.id, payload)
            }),
          )

          if (responses.some((response) => response.state === 'error')) {
            return toast.error('Failed to mark read')
          } else {
            // Mark isRead in channels and update secureMessages in store
            channelsToUpdate.forEach((ch) => {
              ch.isRead = true
            })

            // Update the secureMessage's channels in the secureMessages array
            const updatedMessages = secureMessages.map((msg) => {
              if (msg.id !== secureMessage.id) {
                return msg
              }
              // Update channels in the root message

              const updatedChannels =
                msg.channels?.map((ch) => {
                  const updated = channelsToUpdate.find((c) => c.id === ch.id)
                  return updated ? { ...ch, isRead: true } : ch
                }) ?? msg.channels

              // Update channels in conversations
              const updatedConversations = msg.secureMessageConversations?.map(
                (conv) => ({
                  ...conv,
                  channels:
                    conv.channels?.map((ch) => {
                      const updated = channelsToUpdate.find(
                        (c) => c.id === ch.id,
                      )
                      if (!updated?.isRead) setUnreadCount(unreadCount - 1)
                      return updated ? { ...ch, isRead: true } : ch
                    }) ?? conv.channels,
                }),
              )

              return {
                ...msg,
                channels: updatedChannels,
                secureMessageConversations: updatedConversations,
              }
            })
            setSecureMessages(updatedMessages)
            // to update the isRead status in the preview
            setPreviewSecureMessage({
              secureMessage: {
                ...secureMessage,
                channels: secureMessage.channels?.map((ch) => ({
                  ...ch,
                  isRead: true,
                })),
                secureMessageConversations:
                  secureMessage.secureMessageConversations?.map((conv) => ({
                    ...conv,
                    channels: conv.channels.map((ch) =>
                      ch.receiverUserId === user.id
                        ? { ...ch, isRead: true }
                        : ch,
                    ),
                  })) ?? [],
              },
              activeTab: activeTab as SecureMessagesTab,
            })
          }
        }
      }
    },
    [setActiveComponent, setPreviewSecureMessage, activeTab, secureMessages],
  )

  if (loading) {
    return (
      <Flex height="50vh" align="center" justify="center">
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
      tableClass="bg-white mt-4 px-2"
      renderFooter={() => DataTableFooter}
      onRowClick={(row: Row<SecureMessage>, table) => {
        onClickSecureMessage(row.original)
        table.toggleAllPageRowsSelected(false)
        row.toggleSelected()
      }}
    />
  )
}

export { SecureMessagesTable }
