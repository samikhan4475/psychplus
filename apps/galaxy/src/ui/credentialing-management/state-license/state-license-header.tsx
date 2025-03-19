'use client'

import { PropsWithChildren } from 'react'
import { Flex, Text } from '@radix-ui/themes'
import { SortByEndDateButton } from '../shared/sort-byend-date-button'
import { useStore } from './store'

const StateLicenseHeader = ({ children }: PropsWithChildren) => {
  const applySmartFilter = useStore((state) => state.applySmartFilter)

  return (
    <Flex direction="column" gap="1" className="bg-pp-bg-accent">
      <Flex className="bg-white" p="2" align="center">
        <Text size="4" weight="medium" className="w-[120px]">
          State License
        </Text>

        <SortByEndDateButton sortByEndDate={() => applySmartFilter()} />
      </Flex>
      {children}
    </Flex>
  )
}

export { StateLicenseHeader }
