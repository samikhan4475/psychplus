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
  ReceiverUserRole,
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
  const [userEmailSuggestionsTags, setUserEmailSuggestionsTags] = useState<
    Tag[]
  >([])
  const { previewSecureMessage, activeComponent } = useStore((state) => state)
  const form = useFormContext<SendMessageSchemaType>()

  const fetchRecipientSuggestions = useCallback(
    async (keyword: string): Promise<EmailRecipients[] | []> => {
      const payload: GetEmailRecipientPayload = {
        userType: EmailRecipientTypes.PATIENT,
      }
      const messageId = form.getValues('messageId')
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

  const handleReply = () => {
    const { secureMessage } = previewSecureMessage

    if (
      secureMessage?.senderEmail &&
      secureMessage?.senderUserRole === ReceiverUserRole.PATIENT
    ) {
      const userRecipient: EmailRecipients = {
        id: secureMessage.senderUserId ?? 0,
        legalName: secureMessage.senderName as LegalName,
        userRoleCode: secureMessage.senderUserRole ?? '',
        contactInfo: { email: secureMessage.senderEmail },
        staffId: 0,
        patientId: secureMessage.senderUserId ?? 0,
      }
      if (userRecipient?.id) {
        const tag = {
          value: secureMessage.senderEmail ?? '',
          label: `${secureMessage?.senderName?.firstName} ${secureMessage?.senderName?.lastName} <${secureMessage.senderEmail}>`,
        }
        setUserEmailSuggestions([userRecipient])
        setUserEmailSuggestionsTags([tag])
        setUserRecipientsTag([tag])
        form.setValue('userRecipients', [userRecipient])
      }
    }
  }

  const handleReplyAll = async () => {
    if (previewSecureMessage?.secureMessage?.id) {
      const res = await getAllChannelsAgainstMessageIdAction(
        previewSecureMessage?.secureMessage?.id,
      )
      if (res.state === 'error') {
        toast.error('Failed to get channels')
        return 'error'
      }
      let channels = res.data

      channels = channels.filter(
        (item) =>
          item.sendMode === SendMode.INTERNAL &&
          item.receiverUserRole === ReceiverUserRole.PATIENT,
      )
      if (!channels.length) return

      const userEmailSuggestions: EmailRecipients[] = []
      const userTags = channels.map((item) => {
        userEmailSuggestions.push({
          id: item.receiverUserId as number,
          legalName: item.receiverName as LegalName,
          userRoleCode: item.receiverUserRole,
          contactInfo: { email: item.receiverEmail },
          staffId: 0,
          patientId: item.receiverUserId ?? 0,
        })
        return {
          label: `${item.receiverName.firstName} ${item.receiverName.lastName} <${item.receiverEmail}>`,
          value: item.receiverEmail,
        }
      })

      if (userEmailSuggestions.length > 0) {
        setUserEmailSuggestions(userEmailSuggestions)
        setUserEmailSuggestionsTags(userTags)
        setUserRecipientsTag(userTags)
        form.setValue('userRecipients', userEmailSuggestions)
      }
    }
  }

  const handleDraft = async () => {
    setUserRecipientsTag([])
    setUserEmailSuggestions([])
    const channels = previewSecureMessage?.secureMessage?.channels ?? []
    const patientTags = channels
      .filter(
        (item) =>
          item.sendMode === EmailRecipientTypes.INTERNAL &&
          item.receiverUserRole === EmailRecipientTypes.PATIENT,
      )
      .map((item) => ({
        label: `${item.receiverName.firstName} ${item.receiverName.lastName} <${item.receiverEmail}>`,
        value: item.receiverEmail ?? '',
      }))

    const allUpdatedRecipients = []

    for (const tag of patientTags) {
      if (tag.value) {
        const userRecipientsResponse = await fetchRecipientSuggestions(
          tag.value,
        )
        const userEmailSuggestion = userRecipientsResponse.find(
          (suggestion): suggestion is EmailRecipients =>
            'contactInfo' in suggestion &&
            suggestion.contactInfo?.email === tag.value,
        )

        if (userEmailSuggestion) {
          allUpdatedRecipients.push({
            ...userEmailSuggestion,
            staffId: 0,
            patientId: userEmailSuggestion.patientId ?? 0,
          })
        }
      }
    }
    form.setValue('userRecipients', allUpdatedRecipients)
    setUserEmailSuggestions(channels)
    setUserRecipientsTag(patientTags)
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
        const userRecipientsResponse = await fetchRecipientSuggestions(keyword)
        if (userRecipientsResponse?.length) {
          const tags = userRecipientsResponse.map((recipient) => ({
            value: recipient?.contactInfo?.email ?? '',
            label: `${recipient?.legalName?.firstName} ${recipient?.legalName?.lastName} <${recipient?.contactInfo?.email}>`,
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
      const existingUserRecipients = form.getValues('userRecipients') ?? []
      const updatedRecipients = [
        ...existingUserRecipients,
        {
          ...userEmailSuggestion,
          staffId: 0,
          patientId: userEmailSuggestion.patientId ?? 0,
        },
      ]
      form.setValue('userRecipients', updatedRecipients)
    }
  }

  const handleOnDelete = async (index: number) => {
    if (activeComponent === ActiveComponent.DRAFT) {
      const channels = previewSecureMessage?.secureMessage?.channels ?? []
      const channel = channels.find(
        (item, index) =>
          item.sendMode === EmailRecipientTypes.INTERNAL &&
          item.receiverUserRole === EmailRecipientTypes.PATIENT &&
          userRecipientsTag?.[index]?.value === item?.externalEmail,
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
        className="border-pp-gray-4 hidden min-h-[40px] border-b"
        align={'center'}
        position="relative"
      >
        <SendToUserTitle />
        <Box className="min-h-[40px] flex-1 flex-wrap">
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
      <FormFieldError name="userRecipients" />
    </>
  )
}
UserRecipientsEmails.displayName = 'UserRecipientsEmails'
export { UserRecipientsEmails }
