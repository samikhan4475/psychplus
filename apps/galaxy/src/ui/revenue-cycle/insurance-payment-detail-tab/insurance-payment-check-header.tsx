import React from 'react'
import { Flex, Grid, Text } from '@radix-ui/themes'
import { CODESETS } from '@/constants'
import { useCodesetCodes } from '@/hooks'
import { formatCurrency, formatDate } from '@/utils'
import { InsurancePayment } from '../types'
import { getPaymentDisplay } from './utils'

interface PaymentCheckHeaderProps {
  paymentDetail: InsurancePayment
}
const PaymentCheckHeader = ({ paymentDetail }: PaymentCheckHeaderProps) => {
  const paymentCodeSet = useCodesetCodes(CODESETS.PaymentMethod)
  return (
    <Grid columns="5" gap="2" px="2" py="3" className="shadow-3">
      <Flex gap="2">
        <Text weight="bold" size="1">
          Insurance Name:
        </Text>
        <Text size="1">{paymentDetail.insuranceName}</Text>
      </Flex>
      <Flex gap="2">
        <Text weight="bold" size="1">
          Check Number:
        </Text>
        <Text size="1">{paymentDetail.checkNumber}</Text>
      </Flex>
      <Flex gap="2">
        <Text weight="bold" size="1">
          Check Amount:
        </Text>
        <Text size="1">{formatCurrency(paymentDetail.amount)}</Text>
      </Flex>
      <Flex gap="2">
        <Text weight="bold" size="1">
          Applied Amount:
        </Text>
        <Text size="1">{formatCurrency(paymentDetail.postedAmount)}</Text>
      </Flex>
      <Flex gap="2">
        <Text weight="bold" size="1">
          Unapplied Amount:
        </Text>
        <Text size="1">
          {formatCurrency(paymentDetail.unPostedAmount ?? paymentDetail.amount)}
        </Text>
      </Flex>
      <Flex gap="2">
        <Text weight="bold" size="1">
          Payment Method:
        </Text>
        <Text size="1">
          {getPaymentDisplay(paymentDetail.paymentMethod, paymentCodeSet)}
        </Text>
      </Flex>
      <Flex gap="2">
        <Text weight="bold" size="1">
          Check Date:
        </Text>
        <Text size="1">
          {paymentDetail.checkDate
            ? formatDate(String(paymentDetail.checkDate), 'MM/dd/yyyy')
            : ''}
        </Text>
      </Flex>
      <Flex gap="2">
        <Text weight="bold" size="1">
          Received Date:
        </Text>
        <Text size="1">
          {paymentDetail.receivedDate
            ? formatDate(String(paymentDetail.receivedDate), 'MM/dd/yyyy')
            : ''}
        </Text>
      </Flex>
      <Flex gap="2">
        <Text weight="bold" size="1">
          Deposit Date:
        </Text>
        <Text size="1">
          {paymentDetail.depositDate
            ? formatDate(String(paymentDetail.depositDate), 'MM/dd/yyyy')
            : ''}
        </Text>
      </Flex>
    </Grid>
  )
}

export { PaymentCheckHeader }
