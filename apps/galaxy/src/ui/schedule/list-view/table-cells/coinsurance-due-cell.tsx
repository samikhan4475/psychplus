import React from 'react'
import { Flex, Text, Tooltip } from '@radix-ui/themes'
import { PropsWithRow } from '@/components'
import { Appointment } from '@/types'
import { formatCurrency } from '@/utils'

const CoinsuranceDueCell = ({
  row: { original: appointment },
}: PropsWithRow<Appointment>) => {

  const paymentError =
    appointment.coInsuranceDue > 0 &&
    appointment.coInsuranceDue > appointment.coInsurancePaid
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
          {formatCurrency(Number(appointment.coInsuranceDue))}
        </Text>
      </Tooltip>
    </Flex>
  )
}

export { CoinsuranceDueCell }
