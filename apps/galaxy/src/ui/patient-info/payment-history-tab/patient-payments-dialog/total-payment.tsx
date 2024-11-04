'use client'

import { Flex, Text } from '@radix-ui/themes'

interface TotalPaymentProps {
  totalPayment: string
}
const TotalPayment = ({ totalPayment }: TotalPaymentProps) => {
  return (
    <Flex width="100%" gap="1" my="2">
      <Text size="1" weight="regular">
        Total Payment
      </Text>
      <Text size="1" weight="bold">
        {totalPayment}
      </Text>
    </Flex>
  )
}

export { TotalPayment }
