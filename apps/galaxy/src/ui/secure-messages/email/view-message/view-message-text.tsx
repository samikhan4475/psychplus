import ReactQuill from 'react-quill'
import { useStore } from '../../store'
import './styles.css'
import { Flex } from '@radix-ui/themes'

const ViewMessageText = () => {
  const { previewSecureMessage } = useStore((state) => state)
  const text = previewSecureMessage?.secureMessage?.text
  if (!text) return
  return (
    <Flex className="view-message-container">
      <ReactQuill
        value={text || ''}
        readOnly
        modules={{ toolbar: null }}
        placeholder="Write your message here..."
      />
    </Flex>
  )
}

export { ViewMessageText }
