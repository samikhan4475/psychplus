'use client'

import React from 'react'
import { Flex, Text } from '@radix-ui/themes'
import { PracticePlanStateListTable } from './practice-plan-state-list-table'

const PracticePlanStateView = () => {
  return (
    <Flex direction="column" className="w-full">
      <Text weight='medium'>State</Text>
      <PracticePlanStateListTable />
    </Flex>
  )
}

export { PracticePlanStateView }
