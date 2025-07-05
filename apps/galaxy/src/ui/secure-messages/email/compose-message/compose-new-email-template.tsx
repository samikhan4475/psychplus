import { useEffect, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Flex } from '@radix-ui/themes'
import { SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { FormContainer } from '@/components'
import { useStore as globalStore } from '@/store'
import { LegalName } from '@/types'
import 'react-quill/dist/quill.snow.css'
import { Tag } from 'react-tag-autocomplete'
import {
  DiscardButton,
  ExternalRecipientsEmails,
  InternalRecipientsEmails,
  NewMessageHeader,
  SaveDraftButton,
  SendButton,
  SubjectInput,
  UserRecipientsEmails,
} from '.'
import {
  createChannelsAction,
  initializeAttachmentsAction,
  postSecureMessagesAction,
  updateChannelAction,
  updateMessageAction,
  uploadAttachmentAction,
} from '../../actions'
import { useStore } from '../../store'
import {
  ActiveComponent,
  Attachment,
  Channel,
  EmailRecipients,
  ReceiverUserRole,
  RecordStatus,
  SecureMessage,
  SecureMessagesTab,
  SendMode,
  SendType,
} from '../../types'
import { mapEmailData } from '../../utils'
import { RichTextEditor } from '../quill-editor'
import { sendMessageSchema, SendMessageSchemaType } from './send-message-schema'

const ComposeNewEmail = ({ isActiveTab }: { isActiveTab: boolean }) => {
  const {
    previewSecureMessage,
    activeComponent,
    setActiveComponent,
    setPreviewSecureMessage,
    search,
    activeTab,
    page,
  } = useStore((state) => state)
  const [attachments, setAttachments] = useState<Partial<Attachment>[]>(
    previewSecureMessage?.secureMessage?.id &&
      activeComponent === ActiveComponent.DRAFT
      ? previewSecureMessage?.secureMessage?.attachments ?? []
      : [],
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
  const [sendType, setSendType] = useState<SendType>(SendType.SEND)
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [uploadingAttachmentIds, setUploadingAttachmentIds] = useState<
    string[]
  >([])
  const [deletingAttachmentIds, setDeletingAttachmentIds] = useState<string[]>(
    [],
  )
  const getDefaultValues = () => {
    const baseValues = {
      messageId: undefined,
      subject: '',
      text: '',
      externalEmails: [],
      internalEmails: [],
      userRecipients: [],
    }
    const { secureMessage } = previewSecureMessage || {}
    const { id = '', subject = '', text = '' } = secureMessage || {}
    if (
      (activeComponent === ActiveComponent.DRAFT ||
        activeComponent === ActiveComponent.FORWARD) &&
      id
    ) {
      return {
        ...baseValues,
        messageId: id,
        subject: subject || '',
        text: text || '',
      }
    } else if (
      (activeComponent === ActiveComponent.REPLY ||
        activeComponent === ActiveComponent.REPLY_TO_ALL) &&
      id &&
      subject
    ) {
      const startsWithRe = subject?.startsWith('Re: ')
      return {
        ...baseValues,
        subject: startsWithRe ? subject : `Re: ${subject}`,
      }
    }

    return baseValues
  }

  const form = useForm<SendMessageSchemaType>({
    resolver: zodResolver(sendMessageSchema),
    criteriaMode: 'all',
    defaultValues: getDefaultValues(),
  })
  const user = globalStore((state) => state.user)

  const onSubmit: SubmitHandler<SendMessageSchemaType> = async ({
    subject,
    text,
    internalEmails,
    externalEmails,
    userRecipients,
  }) => {
    setIsSubmitting(true)
    const messageId = form.getValues('messageId')

    const updatedExternalEmails: Tag[] =
      externalEmails?.map((email) => ({
        label: email.label,
        value: email.value ?? '',
      })) || []

    const channelsCreated = await createChannels(
      internalEmails as (Partial<EmailRecipients> | undefined)[],
      updatedExternalEmails,
      userRecipients as (EmailRecipients | undefined)[],
      messageId,
    )
    if (!channelsCreated) {
      return setIsSubmitting(false)
    }
    const updatedMessageId = await updateMessage(sendType, subject, text)
    if (!updatedMessageId) {
      return setIsSubmitting(false)
    }
    await handleReplyAction()
    toast.success(
      sendType === SendType.SEND
        ? `Message sent successfully`
        : `Draft saved successfully`,
    )
    setActiveComponent(ActiveComponent.NEW_EMAIL_PLACEHOLDER)
    setIsSubmitting(false)
    search({ messageStatus: activeTab }, page, true)
  }

  useEffect(() => {
    if (
      [
        ActiveComponent.COMPOSE_MAIL,
        ActiveComponent.REPLY,
        ActiveComponent.REPLY_TO_ALL,
      ].includes(activeComponent) &&
      isActiveTab
    ) {
      createNewMessageId()
    }
  }, [])

  useEffect(() => {
    if (
      activeComponent === ActiveComponent.FORWARD &&
      previewSecureMessage?.secureMessage?.attachments &&
      attachments.length === 0
    ) {
      setAttachments(previewSecureMessage?.secureMessage?.attachments)
    }
  }, [activeComponent, previewSecureMessage.secureMessage?.id])

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
      const results = await createChannelsAction(messageId, emailRecords)
      if (results.state === 'error') {
        toast.error('Failed to create some channels')
        return false
      }
      return results.data
    }
  }

  const createNewMessageId = async () => {
    const { secureMessage } = previewSecureMessage || {}
    const secureMessageData: Partial<SecureMessage> = {
      subject: form.getValues('subject'),
      text: '',
      externalEmailAddress: null,
      isMessageSent: false,
      messageStatus: SendMode.DRAFT,
      recordStatus: RecordStatus.ACTIVE,
      senderUserId: user.id,
    }
    if (
      activeComponent === ActiveComponent.REPLY ||
      activeComponent === ActiveComponent.REPLY_TO_ALL ||
      activeComponent === ActiveComponent.FORWARD
    ) {
      secureMessageData.conversationId =
        secureMessage?.conversationId ?? secureMessage?.id
    }
    const result = await postSecureMessagesAction(secureMessageData)
    if (result.state === 'error') {
      return toast.error('Failed to create message')
    } else {
      form.setValue('messageId', result.data.id)
      const newMessageId = result.data.id
      if (
        activeComponent !== ActiveComponent.REPLY &&
        activeComponent !== ActiveComponent.REPLY_TO_ALL
      )
        return
      let channels: Partial<Channel>[] = []
      const internalRecipient: EmailRecipients = {
        id: secureMessage?.senderUserId ?? 0,
        legalName: secureMessage?.senderName as LegalName,
        userRoleCode: secureMessage?.senderUserRole ?? '',
        contactInfo: { email: secureMessage?.senderEmail ?? '' },
        staffId:
          secureMessage?.senderUserRole === ReceiverUserRole.STAFF
            ? secureMessage.senderUserId ?? 0
            : 0,
        patientId:
          secureMessage?.senderUserRole === ReceiverUserRole.PATIENT
            ? secureMessage.senderUserId ?? 0
            : 0,
      }
      const senderChannel = mapEmailData({
        emails: [internalRecipient],
        messageId: newMessageId,
      })?.[0]
      if (senderChannel?.messageId) channels.push(senderChannel as Channel)
      if (
        activeComponent === ActiveComponent.REPLY_TO_ALL &&
        secureMessage?.channels?.length
      ) {
        channels = [
          ...channels,
          ...secureMessage.channels.filter(
            (channel) => channel.receiverUserId !== user.id,
          ),
        ]
      }
      if (newMessageId && channels?.length) {
        const results = await createChannelsAction(newMessageId, channels)
        if (results.state === 'error') {
          toast.error('Failed to create some channels')
        }
      }
    }
  }

  const updateMessage = async (
    sendType: string,
    subject: string,
    text: string,
  ) => {
    const sanitizedSubject = subject.startsWith('Fw: ')
      ? subject.slice(4)
      : subject
    const messageId = form.getValues('messageId')

    const secureMessagePayload: {
      id?: string
      subject: string
      text: string
      externalEmailAddress: string | null
      isMessageSent?: boolean
      messageStatus: SendMode
      recordStatus: string
      conversationId?: string
      senderUserId: number
    } = {
      id: messageId,
      subject: sanitizedSubject,
      text,
      externalEmailAddress: null,
      isMessageSent: true,
      messageStatus:
        sendType === SendType.SEND ? SendMode.SUCCESS : SendMode.DRAFT,
      recordStatus: RecordStatus.ACTIVE,
      senderUserId: user.id,
    }
    if (
      [ActiveComponent.REPLY, ActiveComponent.REPLY_TO_ALL].includes(
        activeComponent,
      )
    ) {
      secureMessagePayload.conversationId =
        previewSecureMessage?.secureMessage?.conversationId ||
        previewSecureMessage?.secureMessage?.id
    } else if (previewSecureMessage?.secureMessage?.conversationId) {
      secureMessagePayload.conversationId =
        previewSecureMessage?.secureMessage?.conversationId
    }
    if (sendType !== SendType.SEND) {
      delete secureMessagePayload.isMessageSent
    }
    if (
      (activeComponent === ActiveComponent.DRAFT &&
        previewSecureMessage.activeTab === SecureMessagesTab.DRAFT &&
        previewSecureMessage.secureMessage?.id) ||
      ([
        ActiveComponent.COMPOSE_MAIL,
        ActiveComponent.REPLY,
        ActiveComponent.REPLY_TO_ALL,
        ActiveComponent.FORWARD,
      ].includes(activeComponent) &&
        messageId)
    ) {
      const result = await updateMessageAction(messageId, secureMessagePayload)
      if (result.state === 'error') {
        toast.error(result.error || 'Failed to update message')
        return false
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

  const replyEmail = async (messageId: string, channel: Channel) => {
    if (!messageId || !channel.id) return
    const payload = {
      ...channel,
      isReplied: true,
    }
    const updateChannel = await updateChannelAction(
      messageId,
      channel.id,
      payload,
    )
    if (updateChannel.state === 'error') {
      toast.error('Failed to reply email')
      return false
    }
  }

  const handleReplyAction = async () => {
    const { activeTab } = previewSecureMessage
    const messageId = previewSecureMessage.secureMessage?.id
    const channel = previewSecureMessage.secureMessage?.channels?.find(
      (a) => a.receiverUserId === user.id,
    )
    if (
      [ActiveComponent.REPLY, ActiveComponent.REPLY_TO_ALL].includes(
        activeComponent,
      ) &&
      channel?.id &&
      messageId &&
      // @TODO: We may not need this condition for activeTab because user can change the tab during replying
      (activeTab === SecureMessagesTab.INBOX ||
        activeTab === SecureMessagesTab.ARCHIVED)
    ) {
      return await replyEmail(messageId, channel)
    }
  }

  return (
    <FormContainer
      form={form}
      onSubmit={onSubmit}
      className="my- h-fit min-w-fit pt-2"
    >
      <Flex
        direction="column"
        className="Xbg-pp-bg-table-cell border-pp-gray-2 !mt-6 w-full rounded-4 border"
      >
        <NewMessageHeader />
        <Flex direction="column" className="w-full space-y-2">
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
          <SubjectInput disabled={isSubmitting} />
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
        </Flex>
      </Flex>
      <Flex gap="3" pt="3" mb="3">
        <SendButton
          onClick={() => setSendType(SendType.SEND)}
          loading={isSubmitting && sendType === SendType.SEND}
          disabled={isSubmitting}
        />
        <SaveDraftButton
          onClick={() => setSendType(SendType.DRAFT)}
          loading={isSubmitting && sendType === SendType.DRAFT}
          disabled={isSubmitting}
        />
        <DiscardButton
          onClick={() => {
            setPreviewSecureMessage({ activeTab, secureMessage: null })
            setActiveComponent(ActiveComponent.NEW_EMAIL_PLACEHOLDER)
          }}
          loading={isSubmitting && sendType === SendType.DRAFT}
          disabled={isSubmitting}
        />
      </Flex>
    </FormContainer>
  )
}

export { ComposeNewEmail }
