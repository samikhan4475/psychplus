'use client'

import { Flex, Text } from '@radix-ui/themes'
import {
  PaymentHistoryTable,
  PaymentHistoryTablePagination,
} from './payment-history-dialog'

interface PaymentHistoryProps {
  patientId: string
}
const PaymentHistory = ({ patientId }: PaymentHistoryProps) => {
  return (
    <Flex direction="column" className="-mx-2 h-[calc(100vh_-_430px)]">
      <Text weight="bold" size="4" className="px-2">
        Payment Hx
      </Text>
      <PaymentHistoryTable patientId={patientId} />
      <PaymentHistoryTablePagination />
    </Flex>
  )
}

export { PaymentHistory }
