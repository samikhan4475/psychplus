import { useCallback, useEffect, useState } from 'react'
import { Box, Button, Flex, IconButton, Text } from '@radix-ui/themes'
import { XIcon } from 'lucide-react'
import { useFormContext } from 'react-hook-form'
import toast from 'react-hot-toast'
import { ReactTags, Tag } from 'react-tag-autocomplete'
import { FormFieldError } from '@/components'
import { cn } from '@/utils'
import 'react-tag-autocomplete/example/src/styles.css'
import { useDebouncedCallback } from 'use-debounce'
import { v4 as uuidv4 } from 'uuid'
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
  ReceiverUserRole,
  SecureMessagesTab,
  SendMode,
  UserRecipientProps,
} from '../types'
import { isEmail } from '../utils'
import { SendMessageSchemaType } from './send-message-schema'
import { SendToUserTitle } from './send-to-user-title'

const UserRecipientsEmails = ({
  userEmailSuggestions,
  userRecipientsTag,
  setUserEmailSuggestions,
  setUserRecipientsTag,
}: UserRecipientProps) => {
  const form = useFormContext<SendMessageSchemaType>()
  const fetchRecipientSuggestions = useCallback(
    async (
      keyword: string,
      userType: EmailRecipientTypes,
    ): Promise<EmailRecipients[]> => {
      const payload: EmailRecipient = {
        userType,
      }
      if (isEmail(keyword)) {
        payload.email = keyword
      } else {
        payload.name = keyword
      }

      const response = await getAllRecipientSuggestionsAction(uuidv4(), payload)
      if (response.state === 'error') {
        return []
      }
      return response.data
    },
    [],
  )

  const [userEmailSuggestionsTags, setUserEmailSuggestionsTags] = useState<
    Tag[]
  >([])
  const { previewSecureMessage, activeComponent } = useStore((state) => state)

  const handleReply = () => {
    const isUserRecipient =
      previewSecureMessage?.secureMessage?.channels?.[0]?.sendMode ===
      EmailRecipientTypes.PATIENT
    const channel = previewSecureMessage?.secureMessage?.channels?.[0]
    if (isUserRecipient) {
      const email =
        previewSecureMessage.activeTab === SecureMessagesTab.INBOX
          ? channel?.externalEmail
          : channel?.receiverEmail
      const tag = {
        label: email || '',
        value: email || '',
      }
      setUserRecipientsTag([tag])
    }
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
      const patientTags = channels
        .filter(
          (channel) =>
            channel.sendMode === SendMode.INTERNAL &&
            channel.receiverUserRole === ReceiverUserRole.PATIENT,
        )
        .map((item) => {
          const email =
            previewSecureMessage.activeTab === SecureMessagesTab.INBOX
              ? item?.externalEmail
              : item?.receiverEmail
          return {
            label: email || '',
            value: email || '',
          }
        })
      if (patientTags.length === 0) return

      const allUpdatedRecipients = []
      const tags = []
      const userEmailSuggestionsArray = []

      for (const tag of patientTags) {
        if (tag.value) {
          const userRecipientsResponse = await fetchRecipientSuggestions(
            tag.value,
            EmailRecipientTypes.PATIENT,
          )
          const userEmailSuggestion = userRecipientsResponse.find(
            (suggestion): suggestion is EmailRecipients =>
              suggestion.contactInfo?.email === tag.value,
          )
          if (userEmailSuggestion) {
            const userRecipientsTags = userRecipientsResponse.map(
              (recipient) => ({
                value: recipient?.contactInfo?.email || '',
                label: `${recipient?.legalName?.firstName || ''} ${
                  recipient?.legalName?.lastName || ''
                }`,
              }),
            )

            tags.push(...userRecipientsTags)
            userEmailSuggestionsArray.push(...userRecipientsResponse)

            allUpdatedRecipients.push({
              ...userEmailSuggestion,
              staffId: userEmailSuggestion.staffId ?? 0,
              patientId: userEmailSuggestion.patientId ?? 0,
            })
          }
        }
      }

      if (allUpdatedRecipients.length > 0) {
        form.setValue(
          'userRecipients',
          allUpdatedRecipients as {
            staffId: number
            patientId: number
            id?: number
            legalName?: { firstName: string; lastName: string; suffix?: string }
            userRoleCode?: string
            contactInfo?: { email?: string }
          }[],
        )
        setUserRecipientsTag(patientTags)
        setUserEmailSuggestionsTags(tags)
        setUserEmailSuggestions(userEmailSuggestionsArray)
      }
    }
  }

  const handleDraft = async () => {
    setUserRecipientsTag([])
    setUserEmailSuggestions([])
    const channels = previewSecureMessage?.secureMessage?.channels || []
    const patientTags = channels
      .filter(
        (item) =>
          item.sendMode === EmailRecipientTypes.INTERNAL &&
          item.receiverUserRole === EmailRecipientTypes.PATIENT,
      )
      .map((item) => ({
        label:
          item.receiverName.firstName + ' ' + item.receiverName.lastName || '',
        value: item.receiverEmail || '',
      }))

    const allUpdatedRecipients = []

    for (const tag of patientTags) {
      if (tag.value) {
        const userRecipientsResponse = await fetchRecipientSuggestions(
          tag.value,
          EmailRecipientTypes.PATIENT,
        )
        const userEmailSuggestion = userRecipientsResponse.find(
          (suggestion): suggestion is EmailRecipients =>
            'contactInfo' in suggestion &&
            suggestion.contactInfo?.email === tag.value,
        )

        if (userEmailSuggestion) {
          allUpdatedRecipients.push({
            ...userEmailSuggestion,
            staffId: userEmailSuggestion.staffId ?? 0,
            patientId: userEmailSuggestion.patientId ?? 0,
          })
        }
      }
    }
    form.setValue('userRecipients', allUpdatedRecipients)
    setUserEmailSuggestions(channels)
    setUserRecipientsTag(patientTags)
  }
  const fetchChannels = async (messageId: string) => {
    const channels = await getAllChannelsAgainstMessageIdAction(messageId)
    if (channels.state === 'error') {
      toast.error('Failed to get channels')
      return 'error'
    }
    return channels.data
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
        const userRecipientsResponse = await fetchRecipientSuggestions(
          keyword,
          EmailRecipientTypes.PATIENT,
        )
        if (userRecipientsResponse?.length) {
          const tags = userRecipientsResponse.map((recipient) => ({
            value: recipient?.contactInfo?.email || '',
            label: `${recipient?.legalName?.firstName} ${recipient?.legalName?.lastName}`,
          }))
          setUserEmailSuggestionsTags(tags)
          setUserEmailSuggestions(userRecipientsResponse)
        }
      }
    },
    [fetchRecipientSuggestions],
  )

  const handleOnAdd = (tag: Tag) => {
    setUserRecipientsTag((prevTags) => [...prevTags, tag])
    const userEmailSuggestion = userEmailSuggestions.find(
      (suggestion): suggestion is EmailRecipients =>
        'contactInfo' in suggestion &&
        suggestion.contactInfo?.email === tag.value,
    )
    if (userEmailSuggestion) {
      const existingUserRecipients = form.getValues('userRecipients') || []
      const updatedRecipients = [
        ...existingUserRecipients,
        {
          ...userEmailSuggestion,
          staffId: userEmailSuggestion.staffId ?? 0,
          patientId: userEmailSuggestion.patientId ?? 0,
        },
      ]
      form.setValue('userRecipients', updatedRecipients)
    }
  }

  const handleOnDelete = async (index: number) => {
    if (activeComponent === ActiveComponent.DRAFT) {
      const channels = previewSecureMessage?.secureMessage?.channels || []
      const channel = channels.find(
        (item, index) =>
          item.sendMode === EmailRecipientTypes.INTERNAL &&
          item.receiverUserRole === EmailRecipientTypes.PATIENT &&
          userRecipientsTag[index].value === item?.externalEmail,
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
    setUserRecipientsTag((prevTags) => prevTags.filter((_, i) => i !== index))
    const updatedUserRecipients = form
      ?.getValues('userRecipients')
      ?.filter((_, i) => i !== index)
    form.setValue('userRecipients', updatedUserRecipients)
  }

  const handleChangeDebounce = useDebouncedCallback(handleChange, 1000)

  return (
    <>
      <Flex
        direction="row"
        className="border-pp-gray-4 h-[40px]  border-b"
        align={'center'}
        position="relative"
      >
        <SendToUserTitle />
        <Box className="max-h-[40px] max-w-[639px] flex-grow overflow-y-auto">
          <ReactTags
            selected={userRecipientsTag}
            suggestions={userEmailSuggestionsTags}
            onInput={handleChangeDebounce}
            onAdd={handleOnAdd}
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
      <FormFieldError name="userRecipients" />
    </>
  )
}
UserRecipientsEmails.displayName = 'UserRecipientsEmails'
export { UserRecipientsEmails }
