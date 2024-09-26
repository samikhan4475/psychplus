import { Flex, Text } from '@radix-ui/themes'
import { SendHorizontalIcon } from 'lucide-react'

const ActionsCell = () => {
  return (
    <Flex
      direction="row"
      height="100%"
      justify="center"
      px="1"
      align="center"
      gap="1"
    >
      <SendHorizontalIcon
        height={13}
        width={13}
        className="text-pp-send-icon"
      />
      <Text className="text-pp-link-text cursor-pointer text-[11px]">Send</Text>
    </Flex>
  )
}

export { ActionsCell }
