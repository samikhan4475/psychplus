import { Flex } from '@radix-ui/themes'
import 'react-quill/dist/quill.snow.css'
import { useEffect, useRef, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { Tag } from 'react-tag-autocomplete'
import { FormContainer } from '@/components'
import {
  ExternalRecipientsEmails,
  SaveDraftButton,
  SendButton,
  SubjectInput,
} from '.'
import {
  addAttachmentsAction,
  getAllChannelsAgainstMessageIdAction,
  postAttachmentsAction,
  postChannelAction,
  postSecureMessagesAction,
  updateChannelAction,
} from '../actions'
import { updateMessageAction } from '../actions/update-message'
import { useStore } from '../store'
import {
  ActiveComponent,
  Attachment,
  Channel,
  EmailRecipients,
  SecureMessagesTab,
  SendMode,
  SendType,
} from '../types'
import { mapEmailData } from '../utils'
import { InternalRecipientsEmails } from './internal-recipients-emails'
import { NewMessageHeader } from './new-message-header'
import { RichTextEditor } from './quill-editor'
import { sendMessageSchema, SendMessageSchemaType } from './send-message-schema'
import { UserRecipientsEmails } from './user-recipients-emails'

const ComposeNewEmail = () => {
  const {
    previewSecureMessage,
    activeComponent,
    setActiveComponent,
    search,
    activeTab,
    page,
  } = useStore((state) => state)
  const [attachments, setAttachments] = useState<Partial<Attachment>[]>([])
  const [internalRecipientsTag, setInternalRecipientsTag] = useState<Tag[]>([])
  const [internalEmailSuggestions, setInternalEmailSuggestions] = useState<
    EmailRecipients[] | Channel[]
  >([])
  const [externalRecipientsTag, setExternalRecipientsTag] = useState<Tag[]>([])
  const [externalEmailSuggestions, setExternalEmailSuggestions] = useState<
    Tag[]
  >([])
  const [userRecipientsTag, setUserRecipientsTag] = useState<Tag[]>([])
  const [userEmailSuggestions, setUserEmailSuggestions] = useState<
    EmailRecipients[] | Channel[]
  >([])
  const [sendType, setSendType] = useState('Send')

  const form = useForm<SendMessageSchemaType>({
    resolver: zodResolver(sendMessageSchema),
    criteriaMode: 'all',
    defaultValues: {
      subject: '',
      text: '',
      externalEmails: [],
      internalEmails: [],
      userRecipients: [],
    },
  })

  const onSubmit: SubmitHandler<SendMessageSchemaType> = async ({
    subject,
    text,
    internalEmails,
    externalEmails,
    userRecipients,
  }) => {
    const channelId = previewSecureMessage?.secureMessage?.channels?.[0]?.id
    let messageId = previewSecureMessage?.secureMessage?.id
    await handleReplyAction(
      previewSecureMessage.activeTab,
      activeComponent,
      channelId,
      messageId,
    )
    messageId = await messageHandler(sendType, subject, text)

    const updatedExternalEmails: Tag[] =
      externalEmails?.map((email) => ({
        label: email.label,
        value: email.value ?? '',
      })) || []

    if (internalEmails) {
      await createChannels(
        sendType,
        internalEmails as (Partial<EmailRecipients> | undefined)[],
        updatedExternalEmails,
        userRecipients as (EmailRecipients | undefined)[],
        channelId,
        messageId,
      )
    }
    await sendAttachment(attachments, messageId)
    toast.success(
      `Message sent successfully to ${
        sendType === SendType.SEND ? SendMode.SUCCESS : SendMode.DRAFT
      }`,
    )

    setActiveComponent(ActiveComponent.NEW_EMAIL)
    search(
      {
        messageStatus: activeTab,
      },
      page,
      true,
    )
  }

  useEffect(() => {
    if (activeComponent === ActiveComponent.COMPOSE_MAIL) {
      setAttachments([])
      setInternalRecipientsTag([])
      setInternalEmailSuggestions([])
      setExternalRecipientsTag([])
      setExternalEmailSuggestions([])
      setUserRecipientsTag([])
      setUserEmailSuggestions([])
      form.reset()
    }
  }, [activeComponent])

  console.log('okcompose')
  useEffect(() => {
    if (
      previewSecureMessage &&
      (activeComponent === ActiveComponent.FORWARD ||
        activeComponent === ActiveComponent.DRAFT)
    ) {
      const text = previewSecureMessage?.secureMessage?.text || ''
      const attachments = previewSecureMessage?.secureMessage?.attachments || []
      form.setValue('text', text)
      setAttachments(attachments)
    }
  }, [activeComponent, previewSecureMessage])

  const createChannel = async ({
    messageId,
    emailRecords,
  }: {
    messageId?: string
    emailRecords?: Partial<Channel>[]
  }) => {
    if (emailRecords && emailRecords.length > 0 && messageId) {
      const results = await Promise.all(
        emailRecords.map((item) => postChannelAction(messageId, item)),
      )
      const isError = results.some((item) => item.state === 'error')
      if (isError) {
        toast.error('Failed to create some channels')
      }
    }
  }
  const updateChannelRecords = async ({
    messageId,
    channelId,
    emailRecords,
  }: {
    messageId?: string
    channelId?: string
    emailRecords?: Partial<Channel>[]
  }) => {
    if (emailRecords && emailRecords.length > 0 && channelId && messageId) {
      const results = await Promise.all(
        emailRecords.map((item) =>
          updateChannelAction(messageId, channelId, item),
        ),
      )
      const isError = results.some((item) => item.state === 'error')
      if (isError) {
        toast.error('Failed to update some channels')
      }
    }
  }
  const createChannels = async (
    sendType: string,
    internalEmails: (Partial<EmailRecipients> | undefined)[],
    externalEmails: Tag[],
    userRecipients: (EmailRecipients | undefined)[],
    channelId?: string,
    messageId?: string,
  ) => {
    const internalEmailsUpdatedData = mapEmailData({
      emails: internalEmails.filter(
        (email): email is Partial<EmailRecipients> => email !== undefined,
      ),
      messageId,
      sendMode: SendMode.INTERNAL,
    })

    const userRecipientsUpdatedData = mapEmailData({
      emails: userRecipients.filter(
        (email): email is EmailRecipients => email !== undefined,
      ),
      messageId,
      sendMode: SendMode.INTERNAL,
    })

    const externalEmailsUpdatedData = mapEmailData({
      emails: externalEmails,
      messageId,
      sendMode: SendMode.EXTERNAL,
    })

    const emailRecords = [
      ...internalEmailsUpdatedData,
      ...externalEmailsUpdatedData,
      ...userRecipientsUpdatedData,
    ]

    if (sendType === SendMode.DRAFT && channelId && messageId) {
      await updateChannelRecords({
        messageId,
        channelId,
        emailRecords,
      })
    } else {
      await createChannel({ messageId, emailRecords })
    }
  }

  const messageHandler = async (
    sendType: string,
    subject: string,
    text: string,
  ) => {
    const sanitizedSubject = subject.startsWith('Fw: ')
      ? subject.slice(4)
      : subject

    const secureMessageData: {
      subject: string
      text: string
      externalEmailAddress: string
      isMessageSent?: boolean
      messageStatus: SendMode
      recordStatus: string
      conversationId?: string
    } = {
      subject: sanitizedSubject,
      text,
      externalEmailAddress: 'string',
      isMessageSent: true,
      messageStatus:
        sendType === SendType.SEND ? SendMode.SUCCESS : SendMode.DRAFT,
      recordStatus: 'Active',
    }
    if (activeComponent === ActiveComponent.REPLY) {
      secureMessageData.conversationId = previewSecureMessage?.secureMessage?.id
    }
    if (sendType !== SendType.SEND) {
      delete secureMessageData.isMessageSent
    }
    if (
      activeComponent === ActiveComponent.DRAFT &&
      previewSecureMessage.activeTab === SecureMessagesTab.DRAFT &&
      previewSecureMessage.secureMessage?.id
    ) {
      const result = await updateMessageAction(
        previewSecureMessage.secureMessage?.id,
        secureMessageData,
      )
      if (result.state === 'error') {
        toast.error('Failed to update message')
        return
      } else {
        return result.data.id
      }
    } else {
      const result = await postSecureMessagesAction(secureMessageData)
      if (result.state === 'error') {
        toast.error('Failed to create message')
        return
      } else {
        return result.data.id
      }
    }
  }
  const sendAttachment = async (
    attachments: Partial<Attachment>[] = [],
    messageId?: string,
  ) => {
    if (!messageId) {
      return
    }

    const attachmentPromises = attachments.map((item) => {
      if (item.uri && item.name && item.mimeType && item.fileDescription) {
        return addAttachmentsAction({
          messageId,
          fileName: item.name,
          fileUrl: item.uri,
          fileDescription: item.fileDescription,
          mimeType: item.mimeType,
        })
      }
    })
    await Promise.all(attachmentPromises)

    const filesToUpload = attachments
      .map((item) => item.file)
      .filter((file): file is File => file !== undefined)

    if (filesToUpload.length > 0) {
      await uploadAttachments({ messageId, attachments: filesToUpload })
    }
  }

  const uploadAttachments = async ({
    messageId,
    attachments = [],
  }: {
    messageId: string
    attachments?: File[]
  }) => {
    if (attachments.length > 0) {
      const formData = new FormData()
      attachments.forEach((file) => formData.append('files', file, file.name))

      const result = await postAttachmentsAction({
        attachmentId: messageId,
        messageId,
        data: formData,
      })
      if (result.state === 'error') {
        toast.error(`Error uploading attachments: ${result.error}`)
      }
    }
  }

  const replyEmail = async (messageId: string, channelId: string) => {
    if (messageId) {
      const updateChannel = await updateChannelAction(messageId, channelId, {
        isReplied: true,
        messageId,
        externalEmail: 'string',
        externalMessageId: 'string',
      })
      if (updateChannel.state === 'error') {
        toast.error('Failed to reply email')
        return
      }
    }
  }

  const replyAll = async (messageId: string) => {
    const channels = await getAllChannelsAgainstMessageIdAction(messageId)
    if (channels.state === 'error') {
      toast.error('Failed to get channels')
      return
    }

    await Promise.all(
      channels.data.map(async (item) => {
        if (!item?.id) {
          toast.error(`Invalid channel item:`)
          return null
        }
        const result = await updateChannelAction(messageId, item.id, {
          isReplied: true,
          messageId,
          externalEmail: 'string',
          externalMessageId: 'string',
        })
        if (result.state === 'error') {
          toast.error('Failed to reply email')
          return
        }
      }),
    )
  }
  const handleReplyAction = async (
    activeTab: SecureMessagesTab,
    activeComponent: ActiveComponent,
    channelId?: string,
    messageId?: string,
  ) => {
    if (
      activeComponent === ActiveComponent.REPLY &&
      channelId &&
      messageId &&
      (activeTab === SecureMessagesTab.INBOX ||
        activeTab === SecureMessagesTab.ARCHIVED)
    ) {
      await replyEmail(messageId, channelId)
    } else if (
      activeComponent === ActiveComponent.REPLY_TO_ALL &&
      messageId &&
      (activeTab === SecureMessagesTab.INBOX ||
        activeTab === SecureMessagesTab.ARCHIVED)
    ) {
      await replyAll(messageId)
    }
  }
  return (
    <FormContainer
      form={form}
      onSubmit={onSubmit}
      className="h-fit min-w-fit  pt-2"
    >
      <Flex direction="column" className="w-full">
        <NewMessageHeader />
        <Flex direction="column" className="w-full space-y-2 p-4">
          <InternalRecipientsEmails
            internalRecipientsTag={internalRecipientsTag}
            setInternalRecipientsTag={setInternalRecipientsTag}
            setInternalEmailSuggestions={setInternalEmailSuggestions}
            internalEmailSuggestions={internalEmailSuggestions}
          />
          <ExternalRecipientsEmails
            externalRecipientsTag={externalRecipientsTag}
            externalEmailSuggestions={externalEmailSuggestions}
            setExternalEmailSuggestions={setExternalEmailSuggestions}
            setExternalRecipientsTag={setExternalRecipientsTag}
          />
          <UserRecipientsEmails
            userRecipientsTag={userRecipientsTag}
            setUserRecipientsTag={setUserRecipientsTag}
            userEmailSuggestions={userEmailSuggestions}
            setUserEmailSuggestions={setUserEmailSuggestions}
          />
          <SubjectInput />
          <RichTextEditor
            attachments={attachments}
            setAttachments={setAttachments}
          />
          <Flex gap="3" pt="3">
            <SendButton onClick={() => setSendType('Send')} />
            <SaveDraftButton onClick={() => setSendType('Draft')} />
          </Flex>
        </Flex>
      </Flex>
    </FormContainer>
  )
}

export { ComposeNewEmail }
