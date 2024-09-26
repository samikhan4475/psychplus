'use client'

import { Flex } from '@radix-ui/themes'
import { PropsWithRow } from '@/components'
import { EditButton } from '../edit-button'
import { BillingHistory } from '../types'
import { ViewFinancialButton } from '../view-financial-button'

const ActionsCell = ({ row }: PropsWithRow<BillingHistory>) => {
  return (
    <Flex gap="1">
      <ViewFinancialButton />
      <EditButton />
    </Flex>
  )
}

export { ActionsCell }
