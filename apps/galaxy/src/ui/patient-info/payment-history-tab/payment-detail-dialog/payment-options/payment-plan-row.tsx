'use client'

import { Flex } from '@radix-ui/themes'
import { PaymentTypeCheckBox } from '../shared'
import { PaymentPlanInput } from './payment-plan-input'

const PaymentPlanRow = () => {
  return (
    <Flex justify="between">
      <PaymentTypeCheckBox
        field="paymentType"
        value="paymentPlan"
        label="Start Monthly Payment plan"
        disabled={true}
      />
      <PaymentPlanInput  />
    </Flex>
  )
}

export { PaymentPlanRow }
