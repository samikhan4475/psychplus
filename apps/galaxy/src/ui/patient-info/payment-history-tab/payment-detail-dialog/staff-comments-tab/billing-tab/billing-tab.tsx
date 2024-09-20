'use client'

import { Flex } from '@radix-ui/themes'
import { AddCommentForm } from './add-comment-form'
import { BillingTable } from './billing-table'

const BillingTab = () => {
  return (
    <Flex direction="column" gap="2" width="100%" py="2">
      <AddCommentForm />
      <BillingTable />
    </Flex>
  )
}

export { BillingTab }
