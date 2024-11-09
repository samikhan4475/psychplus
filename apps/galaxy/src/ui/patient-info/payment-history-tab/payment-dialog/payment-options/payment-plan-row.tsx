'use client'

import { Flex } from '@radix-ui/themes'
import { PaymentTypeCheckBox } from '../shared'
import { PaymentPlanInput } from './payment-plan-input'
import { PaymentType } from '../types'

const PaymentPlanRow = () => {
  return (
    <Flex justify="between">
      <PaymentTypeCheckBox
        field="paymentType"
        value={PaymentType.PaymentPlan}
        label="Start Monthly Payment plan"
        disabled={true}
      />
      <PaymentPlanInput  />
    </Flex>
  )
}

export { PaymentPlanRow }
