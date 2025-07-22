import { Flex, Text } from '@radix-ui/themes'
import { getDateLabel } from '../utils'

const MessageSeparator = ({ date }: { date: string }) => {
  return (
    <Flex justify="center" align="center" gap="2" mt="4" mb="4">
      <Flex className="border-pp-gray-2 h-0 w-full border" />
      <Text className="text-pp-gray-1 text-2 font-[500]">
        {getDateLabel(date)}
      </Text>
      <Flex className="border-pp-gray-2 h-0 w-full border" />
    </Flex>
  )
}

export { MessageSeparator }
