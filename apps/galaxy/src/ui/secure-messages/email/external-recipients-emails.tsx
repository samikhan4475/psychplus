import React, {
  forwardRef,
  memo,
  useCallback,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react'
import { Box, Flex } from '@radix-ui/themes'
import { ReactTags, Tag } from 'react-tag-autocomplete'
import 'react-tag-autocomplete/example/src/styles.css'
import { useFormContext } from 'react-hook-form'
import toast from 'react-hot-toast'
import { FormFieldError } from '@/components'
import { SendExternalTitle } from '.'
import {
  getAllChannelsAgainstMessageIdAction,
  updateChannelAction,
} from '../actions'
import { EMAIL_REGEX } from '../contants'
import { useStore } from '../store'
import {
  ActiveComponent,
  EmailRecipientTypes,
  ExternalRecipientProps,
  SecureMessagesTab,
} from '../types'
import { SendMessageSchemaType } from './send-message-schema'

const ExternalRecipientsEmails = ({
  externalRecipientsTag,
  externalEmailSuggestions,
  setExternalEmailSuggestions,
  setExternalRecipientsTag,
}: ExternalRecipientProps) => {
  const form = useFormContext<SendMessageSchemaType>()
  const { previewSecureMessage, activeComponent } = useStore((state) => state)

  const handleReply = () => {
    if (previewSecureMessage.activeTab !== SecureMessagesTab.INBOX) {
      return
    }

    const channels = previewSecureMessage?.secureMessage?.channels || []
    if (
      channels.length === 0 ||
      channels[0]?.sendMode !== EmailRecipientTypes.EXTERNAL
    ) {
      return
    }

    const email =
      previewSecureMessage.activeTab === SecureMessagesTab.INBOX
        ? channels[0]?.receiverEmail
        : channels[0]?.externalEmail || ''

    if (!email) {
      return
    }

    const tag = {
      label: email,
      value: email,
    }
    setExternalEmailSuggestions((prevSuggestions) => {
      const suggestionsSet = new Set(prevSuggestions.map((s) => s.value))

      if (email && typeof email === 'string') {
        suggestionsSet.add(email)
      }

      const updatedSuggestions = Array.from(suggestionsSet).map((value) => ({
        label: String(value),
        value: String(value),
      }))

      form.setValue('externalEmails', updatedSuggestions)
      return updatedSuggestions
    })

    setExternalRecipientsTag([tag])
  }

  const handleReplyAll = async () => {
    if (previewSecureMessage?.secureMessage?.id) {
      const channels = await fetchChannels(
        previewSecureMessage?.secureMessage?.id,
      )
      if (channels === 'error') {
        toast.error('Failed to get channels')
        return 'error'
      }
      const externalTags = channels
        .filter((item) => item.sendMode === EmailRecipientTypes.EXTERNAL)
        .map((item) => ({
          label: item.externalEmail || '',
          value: item.externalEmail || '',
        }))

      if (externalTags.length <= 0) return

      form.setValue('externalEmails', externalTags)
      setExternalEmailSuggestions(externalTags)
      setExternalRecipientsTag(externalTags)
    }
  }

  const handleDraft = () => {
    setExternalRecipientsTag([])
    setExternalEmailSuggestions([])
    const channels = previewSecureMessage?.secureMessage?.channels || []
    const externalTags = channels
      .filter((item) => item.sendMode === EmailRecipientTypes.EXTERNAL)
      .map((item) => {
        const email =
          previewSecureMessage.activeTab === SecureMessagesTab.INBOX
            ? item.receiverEmail
            : item.externalEmail
        return {
          label: email || '',
          value: email || '',
        }
      })

    if (externalTags.length <= 0) return

    setExternalEmailSuggestions(externalTags)
    setExternalRecipientsTag(externalTags)
  }

  useEffect(() => {
    if (!previewSecureMessage) return

    switch (activeComponent) {
      case ActiveComponent.REPLY:
        handleReply()
        break

      case ActiveComponent.REPLY_TO_ALL:
        handleReplyAll()
        break

      case ActiveComponent.DRAFT:
        handleDraft()
        break

      default:
        break
    }
  }, [activeComponent, previewSecureMessage])

  const fetchChannels = async (messageId: string) => {
    const channels = await getAllChannelsAgainstMessageIdAction(messageId)
    if (channels.state === 'error') {
      toast.error('Failed to get channels')
      return 'error'
    }
    return channels.data
  }

  const handleChange = useCallback(
    async (keyword: string) => {
      if (EMAIL_REGEX.test(keyword)) {
        setExternalEmailSuggestions((prevSuggestions) => {
          const updatedSuggestions = [
            ...prevSuggestions,
            {
              value: keyword,
              label: keyword,
            },
          ]
          return updatedSuggestions
        })
      }
    },
    [form],
  )

  const setExternalRecipients = (tag: Tag) => {
    const updatedExternalRecipientsTag = [...externalRecipientsTag, tag]
    setExternalRecipientsTag(updatedExternalRecipientsTag)
    form.setValue('externalEmails', updatedExternalRecipientsTag)
  }

  const removeExternalRecipients = async (index: number) => {
    if (activeComponent === ActiveComponent.DRAFT) {
      const channels = previewSecureMessage?.secureMessage?.channels || []
      const channel = channels.find(
        (item, index) =>
          item.sendMode === EmailRecipientTypes.EXTERNAL &&
          externalRecipientsTag[index].value === item?.externalEmail,
      )
      if (previewSecureMessage?.secureMessage?.id && channel?.id) {
        const result = await updateChannelAction(
          previewSecureMessage?.secureMessage?.id,
          channel?.id,
          {
            ...channel,
            recordStatus: 'Deleted',
          },
        )
        if (result.state === 'error') {
          toast.error('Failed to remove email')
          return
        }
      }
    }
    setExternalRecipientsTag(
      externalRecipientsTag.filter((item, i) => i !== index),
    )
  }

  return (
    <>
      <Flex
        direction="row"
        className="border-pp-gray-4 h-[40px]  border-b"
        align={'center'}
        position="relative"
      >
        <SendExternalTitle />
        <Box className="max-h-[40px] max-w-[639px] flex-grow overflow-y-auto">
          <ReactTags
            selected={externalRecipientsTag}
            suggestions={externalEmailSuggestions}
            onInput={handleChange}
            onAdd={setExternalRecipients}
            onDelete={removeExternalRecipients}
            collapseOnSelect
            noOptionsText="No Matches"
            placeholderText=""
            labelText=""
            renderInput={(inputProps) => (
              <input {...inputProps} className="flex-grow outline-none" />
            )}
            renderRoot={({ children, ...rootProps }) => (
              <Flex
                align="center"
                gap="1"
                className="border-none"
                {...rootProps}
              >
                {children}
              </Flex>
            )}
          />
        </Box>
      </Flex>
      <FormFieldError name="externalEmails" />
    </>
  )
}
ExternalRecipientsEmails.displayName = 'ExternalRecipientsEmails'
export { ExternalRecipientsEmails }
