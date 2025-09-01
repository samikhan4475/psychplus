import { Flex, Text } from '@radix-ui/themes'
import 'quill/dist/quill.snow.css'

interface SenderMessageViewProps {
  content: string
}

const SenderMessageView = ({ content }: SenderMessageViewProps) => {
  return (
    <Flex direction="column" gap="2" className="self-end">
      <Text className="text-2 font-[600]">You</Text>
      <Flex className="bg-pp-blue-3 max-w-[960px] rounded-bl-2 rounded-br-2 rounded-tl-2">
        <Text
          className="text-white ql-editor text-3 font-[400]"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </Flex>
    </Flex>
  )
}

export { SenderMessageView }
