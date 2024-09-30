'use client'

import { Flex } from '@radix-ui/themes'
import { InsurancePaymentTable } from './insurance-payment-table'

const InsurancePaymentTableTab = () => {
  return (
    <Flex direction="column" className="h-fit p-2">
      <InsurancePaymentTable />
    </Flex>
  )
}

export { InsurancePaymentTableTab }
