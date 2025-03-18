import dynamic from 'next/dynamic'
import { useStore } from '../../store'
import './styles.css'
import { Flex } from '@radix-ui/themes'

const ReactQuill = dynamic(() => import('react-quill'), {
  ssr: false,
})

const ViewMessageText = () => {
  const previewSecureMessage = useStore((state) => state.previewSecureMessage)
  const text = previewSecureMessage?.secureMessage?.text
  if (!text) return
  return (
    <Flex className="view-message-container">
      <ReactQuill
        value={text || ''}
        readOnly
        modules={{ toolbar: null }}
        className="w-full"
        placeholder="Write your message here..."
      />
    </Flex>
  )
}

export { ViewMessageText }
