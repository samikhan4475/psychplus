import { Flex } from '@radix-ui/themes'
import 'react-quill/dist/quill.snow.css'
import { useEffect, useState } from 'react'
import { Tag } from 'react-tag-autocomplete'
import { ExternalRecipientsEmails, SaveDraftButton, SendButton } from '.'
import { getAllChannelsAgainstMessageIdAction } from '../actions/get-channels'
import { useStore } from '../store'
import { ActiveComponent, ActiveComponentProps } from '../types'
import { InternalRecipientsEmails } from './internal-recipients-emails'
import { NewMessageHeader } from './new-message-header'
import { RichTextEditor } from './quill-editor'
import { SubjectInput } from './subject-input'
import { UserRecipientsEmails } from './user-recipients-emails'

const ComposeNewEmail = ({
  setActiveComponent,
  activeComponent,
}: ActiveComponentProps) => {
  const [externalRecipientsTag, setExternalRecipientsTag] = useState<Tag[]>([])
  const [internalRecipientsTag, setInternalRecipientsTag] = useState<Tag[]>([])

  const { previewSecureMessage } = useStore((state) => state)

  useEffect(() => {
    if (activeComponent === ActiveComponent.REPLY && previewSecureMessage?.id) {
      const externalRecipientsTag =
        previewSecureMessage?.channel?.sendMode === 'EXT Staff'
      const internalRecipientsTag =
        previewSecureMessage?.channel?.sendMode === 'INT Staff'
      const tag = {
        label: previewSecureMessage.channel?.externalEmail || '',
        value: previewSecureMessage.channel?.externalEmail || '',
      }
      if (externalRecipientsTag) {
        setExternalRecipientsTag([tag])
      }
      if (internalRecipientsTag) {
        setInternalRecipientsTag([tag])
      }
    } else if (
      activeComponent === ActiveComponent.REPLY_TO_ALL &&
      previewSecureMessage?.id
    ) {
      fetchChannels(previewSecureMessage.id)
    }
  }, [previewSecureMessage, activeComponent])

  const fetchChannels = async (messageId: string) => {
    const channels = await getAllChannelsAgainstMessageIdAction(messageId)
    // TODO: send this channels into the send api
    if (channels.state === 'error') {
      return 'error'
    }
  }

  return (
    <Flex direction="column" className="w-full">
      <NewMessageHeader
        activeComponent={activeComponent}
        setActiveComponent={setActiveComponent}
      />
      <Flex direction="column" className="w-full space-y-2 p-4">
        <InternalRecipientsEmails
          internalRecipientsTag={internalRecipientsTag}
          setInternalRecipientsTag={setInternalRecipientsTag}
        />
        <ExternalRecipientsEmails
          externalRecipientsTag={externalRecipientsTag}
          setExternalRecipientsTag={setExternalRecipientsTag}
        />
        <UserRecipientsEmails />
        <SubjectInput activeComponent={activeComponent} />
        <RichTextEditor activeComponent={activeComponent} />
        <Flex gap="3" pt="3">
          <SendButton />
          <SaveDraftButton />
        </Flex>
      </Flex>
    </Flex>
  )
}

export { ComposeNewEmail }
