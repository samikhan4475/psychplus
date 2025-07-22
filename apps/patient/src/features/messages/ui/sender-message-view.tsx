import { Flex, Text } from '@radix-ui/themes'

interface SenderMessageViewProps {
  content: string
}

const SenderMessageView = ({ content }: SenderMessageViewProps) => {
  return (
    <Flex direction="column" gap="2" className="self-end">
      <Text className="text-2 font-[600]">You</Text>
      <Flex className="bg-pp-blue-3 max-w-[960px] rounded-bl-2 rounded-br-2 rounded-tl-2 px-[14px] py-[10px]">
        <Text className="text-white text-3 font-[400]">{content}</Text>
      </Flex>
    </Flex>
  )
}

export { SenderMessageView }
