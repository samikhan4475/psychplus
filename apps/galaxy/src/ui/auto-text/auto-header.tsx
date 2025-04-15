'use client'

import React from 'react'
import { Flex } from '@radix-ui/themes'
import { TabContentHeading } from '@/components'
import { AddAutoTextButton } from './add-auto-text-button'
import { FilterForm } from './filter-form'

const AutoHeader = () => {
  return (
    <TabContentHeading
      title="AutoText Manager"
      className="bg-white flex-grow-0 gap-2 whitespace-nowrap rounded-1 p-2 shadow-2"
    >
      <Flex align="center" justify="between" width="100%">
        <FilterForm />
        <AddAutoTextButton />
      </Flex>
    </TabContentHeading>
  )
}

export { AutoHeader }
