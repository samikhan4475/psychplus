'use client'

import { Flex, Text } from '@radix-ui/themes'
import { formatCurrency } from '@/utils'
import { PatientPaymentsDialog } from './patient-payments-dialog'
import { PaymentHistory } from './types'

interface PaymentHeaderProps {
  data?: PaymentHistory
  patientId: string
}

const PaymentHeader = ({ data, patientId }: PaymentHeaderProps) => {
  const totalPayment = formatCurrency(data?.totalPayment ?? 0)
  return (
    <Flex gap="9" className="bg-pp-table-subRows px-2 py-1">
      <Flex gap="1" align="center">
        <Text size="1">Total Due</Text>
        <Text size="2" weight="bold">
          {formatCurrency(data?.totalDue ?? 0)}
        </Text>
      </Flex>
      <Flex gap="1" align="center">
        <Text size="1">Remaining Due (Balance)</Text>
        <Text size="2" weight="bold">
          {formatCurrency(data?.remainingDue ?? 0)}
        </Text>
      </Flex>
      <Flex gap="1" align="center">
        <Text size="1">Unapplied Payment</Text>
        <Text size="2" weight="bold">
          {formatCurrency(data?.unappliedPayment ?? 0)}
        </Text>
      </Flex>
      <Flex gap="1" align="center">
        <PatientPaymentsDialog patientId={patientId} totalPayment={totalPayment} />
        <Text size="1">Total Payment</Text>
        <Text size="2" weight="bold">
          {totalPayment}
        </Text>
      </Flex>
      <Flex gap="1" align="center">
        <Text size="1">Bundled Amount</Text>
        <Text size="2" weight="bold">
          {formatCurrency(data?.bundledAmount ?? 0)}
        </Text>
      </Flex>
    </Flex>
  )
}

export { PaymentHeader }
