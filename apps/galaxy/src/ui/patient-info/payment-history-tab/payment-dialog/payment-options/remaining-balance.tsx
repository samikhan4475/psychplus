'use client'

import { Text } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { formatCurrency } from '@/utils'
import { PaymentDetailSchemaType } from '../payment-schema'

const RemainingBalance = () => {
  const form = useFormContext<PaymentDetailSchemaType>()
  const balance = form.watch('remainingBalance')
  return (
    <Text size="1" className="flex-1 text-right">
      Remaining Balance {formatCurrency(Number(balance))}
    </Text>
  )
}

export { RemainingBalance }
