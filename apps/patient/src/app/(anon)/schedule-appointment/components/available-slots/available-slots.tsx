'use client'

import { useRouter } from 'next/navigation'
import { PlusIcon } from '@radix-ui/react-icons'
import { Flex, Text } from '@radix-ui/themes'
import { MintFreshColor, psychPlusBlueColor, whiteColor } from '@/components'

const AvailableSlots = () => {
  return (
    <Flex gap="2" direction="column">
      <Flex gap="4">
        <Slot time="10:00AM" priority={false} />
        <Slot time="11:00AM" priority={false} />
        <Slot time="01:00PM" priority={false} />
        <Slot time="10:00AM" priority={false} />
        <Slot time="11:00AM" priority={false} />
        <Slot time="12:00PM" priority={true} />
        <Slot time="12:00PM" priority={true} />
      </Flex>
      <Flex gap="4">
        <Slot time="10:30AM" priority={false} />
        <Slot time="12:00PM" priority={true} />
        <Slot time="10:00AM" priority={false} />
        <Slot time="10:00AM" priority={false} />
        <Slot time="10:00AM" priority={false} />
        <Slot time="01:00PM" priority={false} />
        <Slot time="01:00PM" priority={false} />
      </Flex>
      <Flex gap="4">
        <Slot time="11:00AM" priority={false} />
        <Slot time="01:00PM" priority={false} />
        <Slot time="10:00AM" priority={false} />
        <Slot time="10:00AM" priority={false} />
        <Slot time="10:00AM" priority={false} />
        <Slot time="10:00AM" priority={false} />
        <Slot time="10:00AM" priority={false} />
      </Flex>
      <Flex gap="4">
        <Slot time="More" priority={false} />
        <Slot time="More" priority={false} />
        <Slot time="More" priority={false} />
        <Slot time="More" priority={false} />
        <Slot time="More" priority={false} />
        <Slot time="More" priority={false} />
        <Slot time="More" priority={false} />
      </Flex>
    </Flex>
  )
}

const Slot = ({ time, priority }: { time: string; priority: boolean }) => {
  const router = useRouter()
  return (
    <Flex
      className="h-10 w-20 rounded-3 border border-[#151B4A]"
      align="center"
      justify="center"
      p="2"
      style={{
        color: priority ? whiteColor : psychPlusBlueColor,
        background: priority ? psychPlusBlueColor : whiteColor,
      }}
      onClick={() => router.push(`/schedule-appointment/personal-details`)}
    >
      <Text size="2">{time}</Text>

      <Flex>{priority && <PlusIcon color={MintFreshColor} />}</Flex>
    </Flex>
  )
}

export { AvailableSlots }
