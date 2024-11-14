import React, { useCallback, useEffect, useState } from 'react'
import { Box, Button, Flex, IconButton, Text } from '@radix-ui/themes'
import { ReactTags, Tag } from 'react-tag-autocomplete'
import 'react-tag-autocomplete/example/src/styles.css'
import { XIcon } from 'lucide-react'
import { useFormContext } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useDebouncedCallback } from 'use-debounce'
import { FormFieldError } from '@/components'
import { cn } from '@/utils'
import { SendInternalTitle } from '.'
import {
  getAllChannelsAgainstMessageIdAction,
  getAllRecipientSuggestionsAction,
  updateChannelAction,
} from '../actions'
import { useStore } from '../store'
import {
  ActiveComponent,
  EmailRecipient,
  EmailRecipients,
  EmailRecipientTypes,
  InternalRecipientProps,
  ReceiverUserRole,
  SecureMessagesTab,
  SendMode,
} from '../types'
import { isEmail } from '../utils'
import { SendMessageSchemaType } from './send-message-schema'

const InternalRecipientsEmails = ({
  internalRecipientsTag,
  setInternalRecipientsTag,
  setInternalEmailSuggestions,
  internalEmailSuggestions,
}: InternalRecipientProps) => {
  const [internalEmailSuggestionsTags, setInternalEmailSuggestionsTags] =
    useState<Tag[]>([])

  const fetchRecipientSuggestions = useCallback(
    async (
      keyword: string,
      userType: EmailRecipientTypes,
      messageId?: string,
    ): Promise<EmailRecipients[] | []> => {
      const payload: EmailRecipient = {
        userType,
      }
      if (isEmail(keyword)) {
        payload.email = keyword
      } else {
        payload.name = keyword
      }
      if (messageId) {
        const response = await getAllRecipientSuggestionsAction(
          messageId,
          payload,
        )
        if (response.state === 'error') {
          toast.error(response.error)
          return []
        }
        return response.data
      }
      return []
    },
    [],
  )

  const form = useFormContext<SendMessageSchemaType>()
  const { previewSecureMessage, activeComponent } = useStore((state) => state)

  const fetchChannels = useCallback(async (messageId: string) => {
    const channels = await getAllChannelsAgainstMessageIdAction(messageId)
    if (channels.state === 'error') {
      toast.error('Failed to get channels')
      return 'error'
    }
    return channels.data
  }, [])

  const handleReply = useCallback(async () => {
    const secureMessage = previewSecureMessage?.secureMessage
    const firstChannel = secureMessage?.channels?.[0]

    const email =
      previewSecureMessage.activeTab === SecureMessagesTab.INBOX &&
      firstChannel?.receiverUserRole === ReceiverUserRole.STAFF
        ? firstChannel.receiverEmail
        : secureMessage?.senderEmail || ''

    const tag = {
      label: email || '',
      value: email || '',
    }
    if (secureMessage?.senderEmail) {
      const internalRecipientsResponse = await fetchRecipientSuggestions(
        tag?.value,
        EmailRecipientTypes.STAFF,
        secureMessage?.id,
      )
      if (internalRecipientsResponse?.length) {
        const tags = internalRecipientsResponse.map((recipient) => ({
          value: recipient?.contactInfo?.email || '',
          label: `${recipient?.legalName?.firstName} ${recipient?.legalName?.lastName}`,
        }))
        setInternalEmailSuggestions(internalRecipientsResponse)
        setInternalEmailSuggestionsTags(tags)
      }
      const internalEmailSuggestion = internalRecipientsResponse.find(
        (suggestion): suggestion is EmailRecipients =>
          'contactInfo' in suggestion &&
          suggestion.contactInfo?.email === tag.value,
      )
      if (internalEmailSuggestion) {
        const updatedRecipients = [
          {
            ...internalEmailSuggestion,
            staffId: internalEmailSuggestion.staffId ?? 0,
            patientId: internalEmailSuggestion.patientId ?? 0,
          },
        ]
        form.setValue('internalEmails', updatedRecipients)
        setInternalRecipientsTag([tag])
      }
    }
  }, [])

  const handleReplyAll = async () => {
    if (previewSecureMessage?.secureMessage?.id) {
      const channels = await fetchChannels(
        previewSecureMessage?.secureMessage?.id,
      )
      if (channels === 'error') {
        toast.error('Failed to get channels')
        return 'error'
      }
      const internalTags = channels
        .filter(
          (channel) =>
            channel.sendMode === SendMode.INTERNAL &&
            channel.receiverUserRole === ReceiverUserRole.STAFF,
        )
        .map((item) => {
          const email =
            previewSecureMessage.activeTab === SecureMessagesTab.INBOX
              ? item.receiverEmail
              : item.externalEmail

          return {
            label: email!,
            value: email!,
          }
        })
      if (internalTags.length === 0) return

      const allUpdatedRecipients: {
        staffId: number
        patientId: number
        contactInfo?: { email?: string }
        legalName?: { firstName: string; lastName: string }
      }[] = []
      const tags: { value: string; label: string }[] = []
      const internalEmailSuggestions: EmailRecipients[] = []

      const fetchRecipientsPromises = internalTags.map(async (tag) => {
        const internalRecipientsResponse = await fetchRecipientSuggestions(
          tag.value,
          EmailRecipientTypes.STAFF,
          previewSecureMessage?.secureMessage?.id,
        )

        const internalEmailSuggestion = internalRecipientsResponse.find(
          (suggestion): suggestion is EmailRecipients =>
            'contactInfo' in suggestion &&
            suggestion.contactInfo?.email === tag.value,
        )

        if (internalEmailSuggestion) {
          // Map each recipient's email and name for tags
          const recipientTags = internalRecipientsResponse.map((recipient) => ({
            value: recipient?.contactInfo?.email || '',
            label: `${recipient?.legalName?.firstName || ''} ${
              recipient?.legalName?.lastName || ''
            }`,
          }))

          tags.push(...recipientTags)
          internalEmailSuggestions.push(...internalRecipientsResponse)
          allUpdatedRecipients.push({
            ...internalRecipientsResponse,
            staffId: internalEmailSuggestion.staffId ?? 0,
            patientId: internalEmailSuggestion.patientId ?? 0,
          })
        }
      })

      await Promise.all(fetchRecipientsPromises)

      if (allUpdatedRecipients.length > 0) {
        form.setValue('internalEmails', allUpdatedRecipients)
        setInternalRecipientsTag(internalTags)
        setInternalEmailSuggestionsTags(tags)
        setInternalEmailSuggestions(internalEmailSuggestions)
      }
    }
  }

  const handleDraft = async () => {
    setInternalRecipientsTag([])
    setInternalEmailSuggestions([])
    const channels = previewSecureMessage?.secureMessage?.channels || []
    const internalTags = channels
      .filter(
        (item) =>
          item.sendMode === EmailRecipientTypes.INTERNAL &&
          item.receiverUserRole === EmailRecipientTypes.STAFF,
      )
      .map((item) => ({
        label:
          item.receiverName.firstName + ' ' + item.receiverName.lastName || '',
        value: item.receiverEmail || '',
      }))

    const allUpdatedRecipients = []

    for (const tag of internalTags) {
      if (tag.value) {
        const internalRecipientsResponse = await fetchRecipientSuggestions(
          tag.value,
          EmailRecipientTypes.STAFF,
          previewSecureMessage?.secureMessage?.id,
        )
        const internalEmailSuggestion = internalRecipientsResponse.find(
          (suggestion): suggestion is EmailRecipients =>
            'contactInfo' in suggestion &&
            suggestion.contactInfo?.email === tag.value,
        )

        if (internalEmailSuggestion) {
          allUpdatedRecipients.push({
            ...internalEmailSuggestion,
            staffId: internalEmailSuggestion.staffId ?? 0,
            patientId: internalEmailSuggestion.patientId ?? 0,
          })
        }
      }
    }
    form.setValue('internalEmails', allUpdatedRecipients)
    setInternalEmailSuggestions(channels)
    setInternalRecipientsTag(internalTags)
  }

  useEffect(() => {
    if (!previewSecureMessage.secureMessage?.id) return
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
  }, [activeComponent, previewSecureMessage.secureMessage?.id])

  const handleChange = useCallback(
    async (keyword: string) => {
      if (keyword) {
        const internalRecipientsResponse = await fetchRecipientSuggestions(
          keyword,
          EmailRecipientTypes.STAFF,
          previewSecureMessage?.secureMessage?.id ||
            form.getValues('messageId'),
        )
        if (internalRecipientsResponse?.length) {
          const tags = internalRecipientsResponse.map((recipient) => ({
            value: recipient?.contactInfo?.email || '',
            label: `${recipient?.legalName?.firstName} ${recipient?.legalName?.lastName}`,
          }))
          setInternalEmailSuggestions(internalRecipientsResponse)
          setInternalEmailSuggestionsTags(tags)
        }
      }
    },
    [fetchRecipientSuggestions],
  )

  const handleChangeDebounce = useDebouncedCallback(handleChange, 1000)

  const handleAddTag = (tag: Tag) => {
    setInternalRecipientsTag((prevTags) => [...prevTags, tag])
    const internalEmailSuggestion = internalEmailSuggestions.find(
      (suggestion): suggestion is EmailRecipients =>
        'contactInfo' in suggestion &&
        suggestion.contactInfo?.email === tag.value,
    )
    if (internalEmailSuggestion) {
      const existingRecipients = form.getValues('internalEmails') || []
      const updatedRecipients = [
        ...existingRecipients,
        {
          ...internalEmailSuggestion,
          staffId: internalEmailSuggestion.staffId ?? 0,
          patientId: internalEmailSuggestion.patientId ?? 0,
        },
      ]
      form.setValue('internalEmails', updatedRecipients)
    }
  }

  const handleOnDelete = useCallback(
    async (index: number) => {
      if (activeComponent === ActiveComponent.DRAFT) {
        const channels = previewSecureMessage?.secureMessage?.channels || []
        const channel = channels.find(
          (item, index) =>
            item.sendMode === EmailRecipientTypes.INTERNAL &&
            item.receiverUserRole === EmailRecipientTypes.STAFF &&
            internalRecipientsTag[index].value === item?.externalEmail,
        )
        if (previewSecureMessage?.secureMessage?.id && channel?.id) {
          const result = await updateChannelAction(
            previewSecureMessage?.secureMessage?.id,
            channel?.id,
            { recordStatus: 'Deleted' },
          )
          if (result.state === 'error') {
            toast.error('Failed to remove email')
            return
          }
        }
      }
      setInternalRecipientsTag((prevTags) =>
        prevTags.filter((_, i) => i !== index),
      )
      const updatedRecipients = form
        ?.getValues('internalEmails')
        ?.filter((_, i) => i !== index)
      form.setValue('internalEmails', updatedRecipients)
    },
    [form],
  )

  return (
    <>
      <FormFieldError name="internalEmails" />
      <Flex
        direction="row"
        className="border-pp-gray-4 h-[40px]  border-b"
        align="center"
        position="relative"
      >
        <SendInternalTitle />
        <Box className="max-h-[40px] max-w-[639px] flex-grow overflow-y-auto">
          <ReactTags
            selected={internalRecipientsTag}
            suggestions={internalEmailSuggestionsTags}
            onInput={handleChangeDebounce}
            onAdd={handleAddTag}
            onDelete={handleOnDelete}
            collapseOnSelect
            noOptionsText="No Matches"
            placeholderText=""
            labelText=""
            renderInput={(inputProps) => (
              <input {...inputProps} className="flex-grow outline-none" />
            )}
            renderTag={({ classNames, tag, onClick, color, ...tagProps }) => {
              return (
                <Button type="button" className={classNames.tag} {...tagProps}>
                  <Text className={cn('text-pp-black-3', classNames.tagName)}>
                    {tag.label}
                  </Text>
                  <IconButton
                    type="button"
                    onClick={onClick}
                    size="1"
                    variant="ghost"
                  >
                    <XIcon size="16" color="gray" />
                  </IconButton>
                </Button>
              )
            }}
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
    </>
  )
}
InternalRecipientsEmails.displayName = 'InternalRecipientsEmails'
export { InternalRecipientsEmails }
