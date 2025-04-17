'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import { Flex, RadioGroup, Text } from '@radix-ui/themes'
import toast from 'react-hot-toast'
import { PaymentOptions } from '@/enum'
import { PatientInsuranceInfo } from '@/types'
import { updatePatientDefaultPaymentStatus } from './actions/update-default-payment-action'

const PatientBillingRadio = ({
  insuranceInfo,
}: {
  insuranceInfo: PatientInsuranceInfo
}) => {
  const [defaultPayment, setDefaultPayment] = useState<PaymentOptions>(
    insuranceInfo?.isSelfPay
      ? PaymentOptions.SELF_PAY
      : PaymentOptions.INSURANCE,
  )
  const [isLoading, setIsLoading] = useState(false)
  const { id } = useParams<{ id: string }>()

  const handleDefaultPaymentChange = async (value: PaymentOptions) => {
    setIsLoading(true)
    setDefaultPayment(value)

    const res = await updatePatientDefaultPaymentStatus(
      id,
      insuranceInfo.id,
      value === PaymentOptions.SELF_PAY,
    )

    if (res.state === 'success') {
      toast.success('Default payment updated successfully')
    } else {
      toast.error('Failed to update default payment')
      setDefaultPayment((prev) => prev)
    }
    setIsLoading(false)
  }

  return (
    <Flex direction="row" gap="2" align="center">
      <Text size="1" weight="medium">
        Patient Billing (default)
      </Text>
      <RadioGroup.Root
        highContrast
        size="1"
        orientation="horizontal"
        value={defaultPayment}
        onValueChange={handleDefaultPaymentChange}
      >
        <Flex gap="4" align="center">
          <RadioGroup.Item disabled={isLoading} value={PaymentOptions.SELF_PAY}>
            Self Pay
          </RadioGroup.Item>
          <RadioGroup.Item
            disabled={isLoading}
            value={PaymentOptions.INSURANCE}
          >
            Insurance
          </RadioGroup.Item>
        </Flex>
      </RadioGroup.Root>
    </Flex>
  )
}

export { PatientBillingRadio }
