'use client'

import { useSearchParams } from 'next/navigation'
import { User } from '@psychplus-v2/auth'
import { Flex } from '@radix-ui/themes'
import { CallCompositeContainer } from './blocks/call-composit'
import { AcsInfo } from './types'

interface Props {
  acsInfo: AcsInfo
  user: User
}

const CallView = ({ acsInfo, user }: Props) => {
  const appointmentId = useSearchParams().get('appointmentId')
  return (
    <Flex
      direction="column"
      className="flex w-full flex-1 flex-col overflow-y-auto px-2.5 py-0.5 shadow-1"
    >
      <CallCompositeContainer
        acsInfo={acsInfo}
        appointmentId={Number(appointmentId)}
        user={user}
      />
    </Flex>
  )
}

export { CallView }
