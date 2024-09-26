import { Flex } from '@radix-ui/themes'
import 'react-quill/dist/quill.snow.css'
import { ExternalRecipientsEmails, SaveDraftButton, SendButton } from '.'
import { ActiveComponentProps } from '../types'
import { InternalRecipientsEmails } from './internal-recipients-emails'
import { NewMessageHeader } from './new-message-header'
import { RichTextEditor } from './quill-editor'
import { SubjectInput } from './subject-input'
import { UserRecipientsEmails } from './user-recipients-emails'

const ComposeNewEmail = ({ setActiveComponent }: ActiveComponentProps) => {
  return (
    <Flex direction="column" className="w-full">
      <NewMessageHeader setActiveComponent={setActiveComponent} />
      <Flex direction="column" className="w-full space-y-2 p-4">
        <InternalRecipientsEmails />
        <ExternalRecipientsEmails />
        <UserRecipientsEmails />
        <SubjectInput />
        <RichTextEditor />
        <Flex gap="3" pt="3">
          <SendButton />
          <SaveDraftButton />
        </Flex>
      </Flex>
    </Flex>
  )
}

export { ComposeNewEmail }
