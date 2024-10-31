import React from 'react'
import { Flex, Grid, Text } from '@radix-ui/themes'
import { formatDate } from '@/utils'
import { InsurancePayment } from '../types'

interface PaymentCheckHeaderProps {
  paymentDetail: InsurancePayment
}
const PaymentCheckHeader = ({ paymentDetail }: PaymentCheckHeaderProps) => {
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
        <Text size="1">${paymentDetail.amount}</Text>
      </Flex>
      <Flex gap="2">
        <Text weight="bold" size="1">
          Applied Amount:
        </Text>
        <Text size="1">--</Text>
      </Flex>
      <Flex gap="2">
        <Text weight="bold" size="1">
          Unapplied Amount:
        </Text>
        <Text size="1">--</Text>
      </Flex>
      <Flex gap="2">
        <Text weight="bold" size="1">
          Payment Method:
        </Text>
        <Text size="1">{paymentDetail.paymentMethod}</Text>
      </Flex>
      <Flex gap="2">
        <Text weight="bold" size="1">
          Check Date:
        </Text>
        <Text size="1">
          {formatDate(String(paymentDetail.checkDate), 'MM/dd/yyyy')}
        </Text>
      </Flex>
      <Flex gap="2">
        <Text weight="bold" size="1">
          Received Date:
        </Text>
        <Text size="1">
          {formatDate(String(paymentDetail.receivedDate), 'MM/dd/yyyy')}
        </Text>
      </Flex>
      <Flex gap="2">
        <Text weight="bold" size="1">
          Deposit Date:
        </Text>
        <Text size="1">
          {formatDate(String(paymentDetail.depositDate), 'MM/dd/yyyy')}
        </Text>
      </Flex>
    </Grid>
  )
}

export { PaymentCheckHeader }
