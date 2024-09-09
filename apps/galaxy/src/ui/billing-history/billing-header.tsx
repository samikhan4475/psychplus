'use client'

import { PropsWithChildren } from 'react'
import { Flex, Heading } from '@radix-ui/themes'
import { HideFilterButton } from './hide-filter-button'
import { useStore } from './store'

const BillingHeader = ({ children }: PropsWithChildren) => {
  const { showFilters } = useStore((state) => ({
    showFilters: state.showFilters,
  }))
  return (
    <Flex
      direction="column"
      gap="1"
      position="sticky"
      top="0"
      className="bg-pp-bg-accent z-[1]"
    >
      <Flex
        align="center"
        className="bg-white h-8 gap-2 rounded-br-1 rounded-tr-1 px-2"
      >
        <Heading size="3" weight="medium">
          Billing History
        </Heading>
        <HideFilterButton />
      </Flex>
      {showFilters && children}
    </Flex>
  )
}

export { BillingHeader }
