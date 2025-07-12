import { useCallback, useEffect, useMemo, useState } from 'react'
import { Box, Flex, IconButton, Text } from '@radix-ui/themes'
import { XIcon } from 'lucide-react'
import { useFormContext } from 'react-hook-form'
import toast from 'react-hot-toast'
import { ReactTags, Tag } from 'react-tag-autocomplete'
import { FormFieldError, LoadingPlaceholder } from '@/components'
import { useStore as useGlobalStore } from '@/store'
import { LegalName } from '@/types'
import { cn } from '@/utils'
import 'react-tag-autocomplete/example/src/styles.css'
import { useDebouncedCallback } from 'use-debounce'
import {
  getAllChannelsAgainstMessageIdAction,
  getAllRecipientSuggestionsAction,
  updateChannelAction,
} from '../../actions'
import { useStore } from '../../store'
import {
  ActiveComponent,
  EmailRecipients,
  EmailRecipientTypes,
  GetEmailRecipientPayload,
  InternalRecipientProps,
  ReceiverUserRole,
  SendMode,
} from '../../types'
import { getLastMessageOfConversation, isEmail } from '../../utils'
import { InputTitle } from './input-title'
import { SendMessageSchemaType } from './send-message-schema'

const InternalRecipientsEmails = ({
  internalRecipientsTag,
  setInternalRecipientsTag,
  setInternalEmailSuggestions,
  internalEmailSuggestions,
}: InternalRecipientProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const [internalEmailSuggestionsTags, setInternalEmailSuggestionsTags] =
    useState<Tag[]>([])
  const form = useFormContext<SendMessageSchemaType>()
  const userId = useGlobalStore((state) => state.user.id)
  const { previewSecureMessage, activeComponent } = useStore((state) => ({
    previewSecureMessage: state.previewSecureMessage,
    activeComponent: state.activeComponent,
  }))

  const message = useMemo(() => {
    return getLastMessageOfConversation(previewSecureMessage?.secureMessage)
  }, [previewSecureMessage?.secureMessage])

  const fetchRecipientSuggestions = useCallback(
    async (
      keyword: string,
      userType: EmailRecipientTypes,
      messageId?: string,
    ): Promise<EmailRecipients[] | []> => {
      setIsLoading(true)
      const payload: GetEmailRecipientPayload = {
        userType,
      }
      if (isEmail(keyword)) {
        payload.email = keyword
      } else {
        payload.name = keyword
      }
      if (!messageId) {
        setIsLoading(false)
        return []
      }
      const response = await getAllRecipientSuggestionsAction(
        messageId,
        payload,
      )
      setIsLoading(false)
      if (response.state === 'error') {
        toast.error(response.error)
        return []
      }
      return response.data
    },
    [],
  )

  const handleReply = useCallback(async () => {
    if (
      message?.senderEmail &&
      message?.senderUserRole === ReceiverUserRole.STAFF
    ) {
      const internalRecipient: EmailRecipients = {
        id: message.senderUserId ?? 0,
        legalName: message.senderName as LegalName,
        userRoleCode: message.senderUserRole ?? '',
        contactInfo: { email: message.senderEmail },
        staffId: message.senderUserId ?? 0,
        patientId: 0,
      }
      if (internalRecipient?.id) {
        const tag = {
          value: message.senderEmail || '',
          label: `${message?.senderName?.firstName} ${message?.senderName?.lastName} <${message.senderEmail}>`,
        }
        setInternalEmailSuggestions([internalRecipient])
        setInternalEmailSuggestionsTags([tag])
        setInternalRecipientsTag([tag])
        form.setValue('internalEmails', [internalRecipient])
      }
    }
  }, [])

  const handleReplyAll = async () => {
    if (message) {
      const res = await getAllChannelsAgainstMessageIdAction(message?.id ?? '')
      if (res.state === 'error') {
        toast.error('Failed to get channels')
        return
      }
      let channels = res.data

      channels = channels.filter(
        (channel) =>
          channel.sendMode === SendMode.INTERNAL &&
          channel.receiverUserRole === ReceiverUserRole.STAFF &&
          channel.receiverUserId !== userId,
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
      if (
        message?.senderEmail &&
        message?.senderUserRole === ReceiverUserRole.STAFF
      ) {
        const senderTag = {
          label: `${message.senderName?.firstName ?? ''} ${
            message.senderName?.lastName ?? ''
          } <${message.senderEmail}>`,
          value: message.senderEmail,
        }
        internalTags.push(senderTag)
        internalEmailSuggestions.push({
          id: message.senderUserId ?? 0,
          legalName: message.senderName as LegalName,
          userRoleCode: message.senderUserRole ?? '',
          contactInfo: { email: message.senderEmail },
          staffId:
            message.senderUserRole === ReceiverUserRole.STAFF
              ? message.senderUserId ?? 0
              : 0,
          patientId: 0,
        })
      }

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

    const channels = message?.channels || []
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
          message?.id,
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
    if (!message?.id) return
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
  }, [activeComponent, message?.id])

  const handleChange = useCallback(
    async (keyword: string) => {
      if (keyword) {
        let internalRecipientsResponse = await fetchRecipientSuggestions(
          keyword,
          EmailRecipientTypes.STAFF,
          message?.id || form.getValues('messageId'),
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
        const channels = message?.channels || []
        const channel = channels.find(
          (item, index) =>
            item.sendMode === EmailRecipientTypes.INTERNAL &&
            item.receiverUserRole === EmailRecipientTypes.STAFF &&
            internalRecipientsTag?.[index]?.value === item?.externalEmail,
        )
        if (channel?.messageId && channel?.id) {
          const result = await updateChannelAction(
            channel.messageId,
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
      <Flex
        direction="row"
        className="border-pp-gray-4 border-b"
        align="center"
        position="relative"
      >
        <InputTitle label="To Internal" />
        <Box className="flex-1 flex-wrap">
          <ReactTags
            selected={internalRecipientsTag}
            suggestions={internalEmailSuggestionsTags}
            onInput={handleChangeDebounce}
            onAdd={handleAddTag}
            onDelete={handleOnDelete}
            collapseOnSelect
            placeholderText=""
            noOptionsText="No Matches"
            labelText=""
            renderInput={({
              className,
              classNames,
              inputWidth,
              ...inputProps
            }) => (
              <input
                {...inputProps}
                className={cn(className, 'flex-grow outline-none')}
              />
            )}
            renderListBox={({ children, classNames, ...listBoxProps }) => {
              return (
                <Box className={classNames.listBox} {...listBoxProps}>
                  {isLoading ? (
                    <LoadingPlaceholder className="bg-white min-h-24" />
                  ) : (
                    children
                  )}
                </Box>
              )
            }}
            renderTag={({
              classNames,
              tag,
              onClick,
              title,
              color,
              ...tagProps
            }) => {
              return (
                <Box
                  as="span"
                  className={cn('gap-1', classNames.tag)}
                  {...tagProps}
                >
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
                </Box>
              )
            }}
            renderRoot={({
              children,
              className,
              classNames,
              isActive,
              isDisabled,
              isInvalid,
              ...rootProps
            }) => (
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
      <FormFieldError name="internalEmails" className="pl-2" />
    </>
  )
}

export { InternalRecipientsEmails }
