'use client'

import { Flex, Text } from '@radix-ui/themes'
import { Clock } from 'lucide-react'

const VideoCallAccess = () => {
  return (
    <Flex className="rounded-[12px] bg-[#FFEDD5] p-4" gap="3">
      <Flex
        align="center"
        justify="center"
        className="max-h-[40px] min-h-[40px] min-w-[40px] max-w-[40px] rounded-[12px] bg-[#F2AE40]"
      >
        <Clock size={22} color="#fff" />
      </Flex>
      <Flex direction="column" gap="1">
        <Text size="4" weight="bold">
          Video Call Access
        </Text>
        <Text size="2" weight="bold">
          You can join your video call 15 minutes before your scheduled
          appointment time. Meanwhile, you can submit payment details.
        </Text>
      </Flex>
    </Flex>
  )
}
export default VideoCallAccess
