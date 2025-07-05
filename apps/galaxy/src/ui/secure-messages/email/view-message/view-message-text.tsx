import { Flex } from '@radix-ui/themes'
import dynamic from 'next/dynamic'
import { ConversationMessage, SecureMessage } from '../../types'
import './styles.css'

const ReactQuill = dynamic(() => import('react-quill'), {
  ssr: false,
})

const ViewMessageText = ({
  message,
}: {
  message: ConversationMessage | Partial<SecureMessage>
}) => {
  const text = message?.text
  if (!text) return
  return (
    <Flex className="view-message-container">
      <ReactQuill
        value={text || ''}
        readOnly
        modules={{ toolbar: null }}
        className="w-full min-h-[80px]"
        placeholder="Write your message here..."
      />
    </Flex>
  )
}

export { ViewMessageText }
