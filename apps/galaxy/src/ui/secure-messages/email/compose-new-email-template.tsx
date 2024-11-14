import { useEffect, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Flex } from '@radix-ui/themes'
import { SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { FormContainer } from '@/components'
import { useStore as globalStore } from '@/store'
import 'react-quill/dist/quill.snow.css'
import { Tag } from 'react-tag-autocomplete'
import {
  ExternalRecipientsEmails,
  SaveDraftButton,
  SendButton,
  SubjectInput,
} from '.'
import {
  getAllChannelsAgainstMessageIdAction,
  initializeAttachmentsAction,
  postChannelAction,
  postSecureMessagesAction,
  updateChannelAction,
} from '../actions'
import { updateMessageAction } from '../actions/update-message'
import { uploadAttachmentAction } from '../actions/upload-attachments'
import { useStore } from '../store'
import {
  ActiveComponent,
  Attachment,
  Channel,
  EmailRecipients,
  SecureMessage,
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
  const [attachments, setAttachments] = useState<Partial<Attachment>[]>(
    previewSecureMessage?.secureMessage?.attachments || [],
  )
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
  const [uploadingAttachmentIds, setUploadingAttachmentIds] = useState<
    string[]
  >([])
  const [deletingAttachmentIds, setDeletingAttachmentIds] = useState<string[]>(
    [],
  )
  const form = useForm<SendMessageSchemaType>({
    resolver: zodResolver(sendMessageSchema),
    criteriaMode: 'all',
    defaultValues: {
      messageId: previewSecureMessage?.secureMessage?.id ?? undefined,
      subject: previewSecureMessage?.secureMessage?.subject ?? '',
      text: previewSecureMessage?.secureMessage?.text ?? '',
      externalEmails: [],
      internalEmails: [],
      userRecipients: [],
    },
  })
  const user = globalStore((state) => state.user)

  const onSubmit: SubmitHandler<SendMessageSchemaType> = async ({
    subject,
    text,
    internalEmails,
    externalEmails,
    userRecipients,
  }) => {
    const messageId =
      previewSecureMessage?.secureMessage?.id || form.getValues('messageId')

    const updatedExternalEmails: Tag[] =
      externalEmails?.map((email) => ({
        label: email.label,
        value: email.value ?? '',
      })) || []

    await createChannels(
      internalEmails as (Partial<EmailRecipients> | undefined)[],
      updatedExternalEmails,
      userRecipients as (EmailRecipients | undefined)[],
      messageId,
    )

    await messageHandler(sendType, subject, text)
    await handleReplyAction()
    toast.success(`Message sent successfully`)
    setActiveComponent(ActiveComponent.NEW_EMAIL)
    search({ messageStatus: activeTab }, page, true)
  }

  useEffect(() => {
    if (activeComponent === ActiveComponent.COMPOSE_MAIL) {
      createNewMessageId()
    }
  }, [])

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

  useEffect(() => {
    if (previewSecureMessage?.secureMessage?.id) {
      if (activeComponent === ActiveComponent.DRAFT) {
        const text = previewSecureMessage?.secureMessage?.text || ''
        const attachments =
          previewSecureMessage?.secureMessage?.attachments || []
        form.setValue('text', text)
        setAttachments(attachments)
      } else if (activeComponent === ActiveComponent.FORWARD) {
        const text = previewSecureMessage?.secureMessage?.text || ''
        const attachments =
          previewSecureMessage?.secureMessage?.attachments || []
        form.setValue('text', text)
        setAttachments(attachments)
        createNewMessageId()
      }
    }
  }, [activeComponent, previewSecureMessage.secureMessage?.id])

  const createChannels = async (
    internalEmails: (Partial<EmailRecipients> | undefined)[],
    externalEmails: Tag[],
    userRecipients: (EmailRecipients | undefined)[],
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
    if (messageId && emailRecords.length) {
      const results = await postChannelAction(messageId, emailRecords)
      if (results.state === 'error') {
        toast.error('Failed to create some channels')
      }
    }
  }

  const createNewMessageId = async () => {
    const secureMessageData: Partial<SecureMessage> = {
      subject: '',
      text: '',
      externalEmailAddress: '',
      isMessageSent: false,
      messageStatus: SendMode.DRAFT,
      recordStatus: 'Active',
      senderUserId: user.id,
    }
    const result = await postSecureMessagesAction(secureMessageData)
    if (result.state === 'error') {
      return toast.error('Failed to create message')
    } else {
      form.setValue('messageId', result.data.id)
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
    const messageId = form.getValues('messageId')

    const secureMessageData: {
      id?: string
      subject: string
      text: string
      externalEmailAddress: string
      isMessageSent?: boolean
      messageStatus: SendMode
      recordStatus: string
      conversationId?: string
      senderUserId: number
    } = {
      id: messageId,
      subject: sanitizedSubject,
      text,
      externalEmailAddress: '',
      isMessageSent: true,
      messageStatus:
        sendType === SendType.SEND ? SendMode.SUCCESS : SendMode.DRAFT,
      recordStatus: 'Active',
      senderUserId: user.id,
    }
    if (activeComponent === ActiveComponent.REPLY) {
      secureMessageData.conversationId = previewSecureMessage?.secureMessage?.id
    }
    if (sendType !== SendType.SEND) {
      delete secureMessageData.isMessageSent
    }
    if (
      (activeComponent === ActiveComponent.DRAFT &&
        previewSecureMessage.activeTab === SecureMessagesTab.DRAFT &&
        previewSecureMessage.secureMessage?.id) ||
      (activeComponent === ActiveComponent.COMPOSE_MAIL && messageId)
    ) {
      secureMessageData.id = messageId
      const result = await updateMessageAction(
        previewSecureMessage.secureMessage?.id || messageId,
        secureMessageData,
      )
      if (result.state === 'error') {
        toast.error(result.error || 'Failed to update message')
        return
      } else {
        return result.data.id
      }
    }
  }

  const sendAttachments = async (newAttachments: Partial<Attachment>[]) => {
    const messageId = form.getValues('messageId')
    if (!messageId || newAttachments.length === 0) {
      return
    }

    const newAttachmentIds = newAttachments.map((attachment) => attachment.id)
    setUploadingAttachmentIds((prev) => [
      ...prev,
      ...(newAttachmentIds as string[]),
    ])

    const uploadPromises = newAttachments.map(async (attachment) => {
      if (!attachment.file || !attachment.name) {
        return
      }

      // Step 1: Initialize the attachment to get attachmentId
      const res = await initializeAttachmentsAction({
        messageId,
        fileName: attachment.name,
        fileDescription: attachment.name,
        mimeType: attachment.file.type,
      })
      if (res.state === 'error') {
        setUploadingAttachmentIds((prev) =>
          prev.filter((id) => id !== attachment.id),
        )
        return toast.error(res.error)
      }
      const { id } = res.data
      if (id) {
        const formData = new FormData()
        formData.append('file', attachment.file as Blob, attachment.name) // Appending file and naming it
        formData.append('fileDescription', attachment.name ?? '')
        formData.append('mimeType', (attachment.file as Blob).type)
        const uploadRes = await uploadAttachmentAction({
          messageId,
          attachmentId: id,
          formData,
        })
        if (uploadRes.state === 'error') {
          setUploadingAttachmentIds((prev) =>
            prev.filter((id) => id !== attachment.id),
          )
          return toast.error(uploadRes.error)
        }
        setUploadingAttachmentIds((prev) =>
          prev.filter((id) => id !== attachment.id),
        )
        setAttachments((prevAttachments) =>
          prevAttachments.map((att) =>
            att.id === attachment.id ? uploadRes.data : att,
          ),
        )
      }
    })

    await Promise.all(uploadPromises)
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
        }
      }),
    )
  }

  const handleReplyAction = async () => {
    const { activeTab } = previewSecureMessage
    const messageId = form.getValues('messageId')
    const channelId = previewSecureMessage.secureMessage?.channels?.find(
      (a) => a.receiverUserId === user.id,
    )?.id
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
            setAttachments={(a: Partial<Attachment>[]) => {
              setAttachments(a)
              sendAttachments(
                a.filter(
                  (att) =>
                    !attachments.some((existing) => existing.id === att.id),
                ),
              )
            }}
            removeAttachment={(index) => {
              const _attachment = [...attachments]
              _attachment.splice(index, 1)
              setAttachments(_attachment)
            }}
            uploadingAttachmentIds={uploadingAttachmentIds}
            deletingAttachmentIds={deletingAttachmentIds}
            setDeletingAttachmentIds={setDeletingAttachmentIds}
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
