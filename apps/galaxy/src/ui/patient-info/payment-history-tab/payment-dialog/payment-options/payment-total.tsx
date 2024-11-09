'use client'

import { Flex, Text } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { PaymentDetailSchemaType } from '../payment-schema'
import { twoDecimal } from '../utils'

const PaymentTotal = () => {
  const { watch } = useFormContext<PaymentDetailSchemaType>()
  const values = watch([
    'remainingBalance',
    'coPayAmount',
    'coInsAmount',
    'customAmount',
  ])
  const totalAmount = values.reduce((sum, value) => {
    const amount = parseFloat(value ?? '0')
    return sum + (isNaN(amount) ? 0 : amount)
  }, 0)
  return (
    <Flex
      align="center"
      className="rounded-2 bg-gray-2 px-2 py-0.5"
      justify="between"
    >
      <Text size="2" weight="medium">
        Payment Total
      </Text>
      <Text size="1">${twoDecimal(totalAmount)}</Text>
    </Flex>
  )
}

export { PaymentTotal }
