'use client'

import { Flex } from '@radix-ui/themes'
import { BillingCommentForm } from './billing-comment-form'
import { BillingTable } from './billing-table'

const BillingTab = () => {
  return (
    <Flex direction="column" gap="2" width="100%" py="2">
      <BillingCommentForm />
      <BillingTable />
    </Flex>
  )
}

export { BillingTab }
