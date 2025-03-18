import { useCallback, useEffect } from 'react'
import { Box, Button, Flex, IconButton, Text } from '@radix-ui/themes'
import { XIcon } from 'lucide-react'
import { useFormContext } from 'react-hook-form'
import toast from 'react-hot-toast'
import { ReactTags, Tag } from 'react-tag-autocomplete'
import { FormFieldError } from '@/components'
import { cn } from '@/utils'
import 'react-tag-autocomplete/example/src/styles.css'
import { SendExternalTitle } from '.'
import { useStore as useMessagesStore } from '../../messages/store'
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
} from '../types'
import { SendMessageSchemaType } from './send-message-schema'

const ExternalRecipientsEmails = ({
  externalRecipientsTag,
  externalEmailSuggestions,
  setExternalEmailSuggestions,
  setExternalRecipientsTag,
}: ExternalRecipientProps) => {
  const form = useFormContext<SendMessageSchemaType>()
  const { previewSecureMessage, activeComponent } = useStore((state) => ({
    previewSecureMessage: state.previewSecureMessage,
    activeComponent: state.activeComponent,
  }))
  const { isEmrDirectUser } = useMessagesStore((state) => ({
    isEmrDirectUser: state.isEmrDirectUser,
  }))

  const handleReply = () => {
    const { externalEmailAddress: email } =
      previewSecureMessage?.secureMessage ?? {}

    if (!email) return

    const tag = {
      label: email,
      value: email,
    }

    const suggestionsSet = new Set(externalEmailSuggestions.map((s) => s.value))

    if (typeof email === 'string') {
      suggestionsSet.add(email)
    }

    const updatedSuggestions = Array.from(suggestionsSet).map((value) => ({
      label: String(value),
      value: String(value),
    }))

    form.setValue('externalEmails', updatedSuggestions)
    setExternalEmailSuggestions(updatedSuggestions)
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
        return {
          label: item.externalEmail ?? '',
          value: item.externalEmail ?? '',
        }
      })

    if (externalTags.length <= 0) return
    form.setValue('externalEmails', externalTags)
    setExternalEmailSuggestions(externalTags)
    setExternalRecipientsTag(externalTags)
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
          externalRecipientsTag?.[index]?.value === item?.externalEmail,
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
        className="border-pp-gray-4 min-h-[40px] border-b"
        align={'center'}
        position="relative"
      >
        <SendExternalTitle />
        <Box className="min-h-[40px] flex-1 flex-wrap">
          <ReactTags
            selected={externalRecipientsTag}
            suggestions={externalEmailSuggestions}
            onInput={handleChange}
            onAdd={setExternalRecipients}
            onDelete={removeExternalRecipients}
            isDisabled={!isEmrDirectUser}
            collapseOnSelect
            noOptionsText="No Matches"
            placeholderText=""
            labelText=""
            renderInput={({ className, ...inputProps }) => (
              <input
                {...inputProps}
                className={cn(className, 'flex-grow outline-none ', {
                  'disabled:bg-transparent': !isEmrDirectUser,
                })}
                disabled={!isEmrDirectUser}
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
      <FormFieldError name="externalEmails" />
    </>
  )
}
ExternalRecipientsEmails.displayName = 'ExternalRecipientsEmails'
export { ExternalRecipientsEmails }
