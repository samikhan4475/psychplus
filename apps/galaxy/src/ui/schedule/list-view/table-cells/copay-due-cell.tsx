import React from 'react'
import { Flex, Text, Tooltip } from '@radix-ui/themes'
import { PropsWithRow } from '@/components'
import { Appointment } from '@/types'
import { formatCurrency } from '@/utils'

const CopayDueCell = ({
  row: { original: appointment },
}: PropsWithRow<Appointment>) => {
  return (
    <Flex
      height="100%"
      width="100%"
      className={appointment.paymentErrorMessage ? 'bg-red-5' : ''}
      align="center"
    >
      <Tooltip
        content={appointment.paymentErrorMessage}
        className={!appointment.paymentErrorMessage ? 'hidden' : ''}
      >
        <Text className="text-pp-black-3 text-gray-9" weight="regular" size="1">
          {formatCurrency(Number(appointment.copayDue))}
        </Text>
      </Tooltip>
    </Flex>
  )
}

export { CopayDueCell }
