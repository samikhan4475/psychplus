'use client'

import { CounterClockwiseClockIcon } from '@radix-ui/react-icons'
import { Flex } from '@radix-ui/themes'
import {
  ArrowDownToLine,
  CircleAlert,
  Mail,
  MessageSquareMore,
  Phone,
} from 'lucide-react'
import { PropsWithRow } from '@/components'
import { PolicyConsents } from '../types'

const ActionsCell = ({ row }: PropsWithRow<PolicyConsents>) => {
  return (
    <Flex gap="1" className="px-1 py-0.5">
      <MessageSquareMore width={16} height={16} className="text-pp-gray-1" />
      <Mail width={16} height={16} className="text-pp-gray-1" />
      <Phone width={16} height={16} className="text-pp-gray-1" />
      <CircleAlert width={16} height={16} className="text-pp-gray-1" />
      <ArrowDownToLine width={16} height={16} className="text-pp-gray-1" />
      <CounterClockwiseClockIcon
        width={16}
        height={16}
        className="text-pp-gray-1"
      />
    </Flex>
  )
}
export { ActionsCell }
