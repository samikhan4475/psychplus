'use client'

import React from 'react'
import { Flex, Text } from '@radix-ui/themes'
import { LabOrderTable } from '@/ui/lab-orders/lab-orders-widget/lab-order-table'

function LabOrders() {
  return (
    <Flex direction="column" gap="1" className="bg-white my-2 rounded-1 p-2">
      <Text className="text-[16px] font-[600] text-accent-12">Lab Orders</Text>
      <LabOrderTable afterSummaryVisit/>
    </Flex>
  )
}

export { LabOrders }
