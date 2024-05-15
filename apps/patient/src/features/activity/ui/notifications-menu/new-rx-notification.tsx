import NextLink from 'next/link'
import { Flex, Text } from '@radix-ui/themes'
import { PillIcon } from 'lucide-react'
import TimeAgo from 'react-timeago'
import type { NewRxActivity } from '../../types'

interface NewRxNotificationProps {
  data: NewRxActivity
}

const NewRxNotification = ({ data }: NewRxNotificationProps) => (
  <NextLink href="/health/medications">
    <Flex
      align="center"
      p="2"
      gap={{ initial: '3', xs: '4' }}
      className="rounded-1 transition-colors hover:bg-accent-2"
    >
      <Flex
        align="center"
        justify="center"
        className="rounded-full h-[35px] w-[35px] min-w-[35px] bg-accent-3 xs:h-[40px] xs:w-[40px] xs:min-w-[40px]"
      >
        <PillIcon
          strokeWidth={1.25}
          fill="white"
          className="h-[16px] w-[16px] text-accent-12 xs:h-[20px] xs:w-[20px]"
        />
      </Flex>
      <Flex direction="column">
        <Text className="text-[12px] xs:text-[13px]">
          You have a new prescription for{' '}
          <Text className="font-[600]">{data.metadata.name}</Text>
        </Text>
        <Text className="text-[12px] text-gray-10">
          <TimeAgo date={data.datetime} live={false} />
        </Text>
      </Flex>
    </Flex>
  </NextLink>
)

export { NewRxNotification }
