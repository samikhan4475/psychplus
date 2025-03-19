import React from 'react'
import { Flex, Text, Tooltip } from '@radix-ui/themes'
import { PropsWithRow } from '@/components'
import { Appointment } from '@/types'
import { formatCurrency } from '@/utils'

const CopayDueCell = ({
  row: { original: appointment },
}: PropsWithRow<Appointment>) => {
  
  const paymentError =
    appointment.copayDue > 0 && appointment.copayDue > appointment.copayPaid
      ? appointment.paymentErrorMessage
      : ''

  return (
    <Flex
      height="100%"
      width="100%"
      className={paymentError ? 'bg-red-5' : ''}
      align="center"
    >
      <Tooltip content={paymentError} className={!paymentError ? 'hidden' : ''}>
        <Text className="text-pp-black-3 text-gray-9" weight="regular" size="1">
          {formatCurrency(Number(appointment.copayDue))}
        </Text>
      </Tooltip>
    </Flex>
  )
}

export { CopayDueCell }
