'use client'

import { getTimeLabel } from '@psychplus-v2/utils'
import { Flex, Text } from '@radix-ui/themes'
import { Clock } from 'lucide-react'
import CountdownTimer from '@/components-v2/countdown-timer'

const VideoCallAccess = ({
  date,
  checkCallEligibility,
}: {
  date: string
  checkCallEligibility: () => boolean
}) => {
  const getJoinWindowTime = () => {
    const appointmentTime = new Date(date)
    const joinTime = new Date(appointmentTime.getTime() - 30 * 60 * 1000)
    return getTimeLabel(joinTime.toISOString())
  }

  return (
    <Flex
      direction="column"
      className="rounded-[12px] bg-[#FFEDD5] p-4"
      gap="3"
    >
      <Flex align="center" justify="center" gap="3">
        <Flex
          align="center"
          justify="center"
          className="max-h-[32px] min-h-[32px] min-w-[32px] max-w-[32px] rounded-[12px] bg-[#F2AE40]"
        >
          <Clock size={18} color="#fff" />
        </Flex>
        <Text size="4" weight="medium">
          You Can Join Call In
        </Text>
        <CountdownTimer targetDate={date} />
      </Flex>
      <Text size="2" weight="medium" align="center">
        Join window opens at{' '}
        <Text size="2" weight="bold">
          {getJoinWindowTime()}
        </Text>{' '}
        (30 minutes before appointment).{' '}
        {!checkCallEligibility() && (
          <>Meanwhile, you can submit payment details</>
        )}
      </Text>
    </Flex>
  )
}

export default VideoCallAccess
