import { useCallback, useEffect, useState } from 'react'
import { Box, Button, Flex, IconButton, Text } from '@radix-ui/themes'
import { XIcon } from 'lucide-react'
import { useFormContext } from 'react-hook-form'
import toast from 'react-hot-toast'
import { ReactTags, Tag } from 'react-tag-autocomplete'
import { FormFieldError } from '@/components'
import { LegalName } from '@/types'
import { cn } from '@/utils'
import 'react-tag-autocomplete/example/src/styles.css'
import { useDebouncedCallback } from 'use-debounce'
import { SendInternalTitle } from '.'
import {
  getAllChannelsAgainstMessageIdAction,
  getAllRecipientSuggestionsAction,
  updateChannelAction,
} from '../actions'
import { useStore } from '../store'
import {
  ActiveComponent,
  EmailRecipients,
  EmailRecipientTypes,
  GetEmailRecipientPayload,
  InternalRecipientProps,
  ReceiverUserRole,
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
  const form = useFormContext<SendMessageSchemaType>()
  const { previewSecureMessage, activeComponent } = useStore((state) => state)

  const fetchRecipientSuggestions = useCallback(
    async (
      keyword: string,
      userType: EmailRecipientTypes,
      messageId?: string,
    ): Promise<EmailRecipients[] | []> => {
      const payload: GetEmailRecipientPayload = {
        userType,
      }
      if (isEmail(keyword)) {
        payload.email = keyword
      } else {
        payload.name = keyword
      }
      if (!messageId) return []
      const response = await getAllRecipientSuggestionsAction(
        messageId,
        payload,
      )
      if (response.state === 'error') {
        toast.error(response.error)
        return []
      }
      return response.data
    },
    [],
  )

  const handleReply = useCallback(async () => {
    const secureMessage = previewSecureMessage?.secureMessage

    if (
      secureMessage?.senderEmail &&
      secureMessage?.senderUserRole === ReceiverUserRole.STAFF
    ) {
      const internalRecipient: EmailRecipients = {
        id: secureMessage.senderUserId ?? 0,
        legalName: secureMessage.senderName as LegalName,
        userRoleCode: secureMessage.senderUserRole ?? '',
        contactInfo: { email: secureMessage.senderEmail },
        staffId: secureMessage.senderUserId ?? 0,
        patientId: 0,
      }
      if (internalRecipient?.id) {
        const tag = {
          value: secureMessage.senderEmail || '',
          label: `${secureMessage?.senderName?.firstName} ${secureMessage?.senderName?.lastName} <${secureMessage.senderEmail}>`,
        }
        setInternalEmailSuggestions([internalRecipient])
        setInternalEmailSuggestionsTags([tag])
        setInternalRecipientsTag([tag])
        form.setValue('internalEmails', [internalRecipient])
      }
    }
  }, [])

  const handleReplyAll = async () => {
    if (previewSecureMessage?.secureMessage?.id) {
      const res = await getAllChannelsAgainstMessageIdAction(
        previewSecureMessage?.secureMessage?.id,
      )
      if (res.state === 'error') {
        toast.error('Failed to get channels')
        return
      }
      let channels = res.data

      channels = channels.filter(
        (channel) =>
          channel.sendMode === SendMode.INTERNAL &&
          channel.receiverUserRole === ReceiverUserRole.STAFF,
      )
      if (!channels.length) return

      const internalEmailSuggestions: EmailRecipients[] = []
      const internalTags = channels.map((item) => {
        internalEmailSuggestions.push({
          id: item.receiverUserId as number,
          legalName: item.receiverName as LegalName,
          userRoleCode: item.receiverUserRole,
          contactInfo: { email: item.receiverEmail },
          staffId:
            item.receiverUserRole === ReceiverUserRole.STAFF
              ? item.receiverUserId ?? 0
              : 0,
          patientId: 0,
        })
        return {
          label: `${item.receiverName.firstName} ${item.receiverName.lastName} <${item.receiverEmail}>`,
          value: item.receiverEmail,
        }
      })

      if (internalEmailSuggestions.length > 0) {
        setInternalEmailSuggestions(internalEmailSuggestions)
        setInternalEmailSuggestionsTags(internalTags)
        setInternalRecipientsTag(internalTags)
        form.setValue('internalEmails', internalEmailSuggestions)
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
        label: `${item.receiverName.firstName} ${item.receiverName.lastName} <${item.receiverEmail}>`,
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
            patientId: 0,
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
        let internalRecipientsResponse = await fetchRecipientSuggestions(
          keyword,
          EmailRecipientTypes.STAFF,
          previewSecureMessage?.secureMessage?.id ||
            form.getValues('messageId'),
        )
        if (internalRecipientsResponse?.length) {
          internalRecipientsResponse = internalRecipientsResponse.filter(
            (recipient) => recipient?.contactInfo?.email,
          )
          const tags = internalRecipientsResponse.map((recipient) => ({
            value: recipient?.contactInfo?.email || '',
            label: `${recipient?.legalName?.firstName} ${recipient?.legalName?.lastName} <${recipient?.contactInfo?.email}>`,
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
    if (internalEmailSuggestion?.id) {
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
            internalRecipientsTag?.[index]?.value === item?.externalEmail,
        )
        if (previewSecureMessage?.secureMessage?.id && channel?.id) {
          const result = await updateChannelAction(
            previewSecureMessage?.secureMessage?.id,
            channel?.id,
            { ...channel, recordStatus: 'Deleted' },
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
        className="border-pp-gray-4 min-h-[40px]  border-b"
        align="center"
        position="relative"
      >
        <SendInternalTitle />
        <Box className="min-h-[40px] flex-1 flex-wrap">
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
            renderInput={({ className, ...inputProps }) => (
              <input
                {...inputProps}
                className={cn(className, 'flex-grow outline-none')}
              />
            )}
            renderTag={({
              classNames,
              tag,
              onClick,
              title,
              color,
              ...tagProps
            }) => {
              return (
                <Button type="button" className={classNames.tag} {...tagProps}>
                  <Text
                    className={cn(
                      'text-pp-black-3 text-[12px] font-[510]',
                      classNames.tagName,
                    )}
                  >
                    {tag.label}
                  </Text>
                  <IconButton
                    type="button"
                    onClick={onClick}
                    size="1"
                    variant="ghost"
                    title={title}
                  >
                    <XIcon size="16" color="gray" />
                  </IconButton>
                </Button>
              )
            }}
            renderRoot={({ children, className, ...rootProps }) => (
              <Flex
                align="center"
                gap="1"
                className={cn(className, 'flex-wrap border-none')}
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
