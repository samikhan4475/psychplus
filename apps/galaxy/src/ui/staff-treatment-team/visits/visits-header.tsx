'use client'

import { PropsWithChildren } from 'react'
import { Flex, Text } from '@radix-ui/themes'
import { ShowFiltersButton } from './show-filters-button'

interface Props extends PropsWithChildren {
  onClick: () => void
  isPartialFilterView: boolean
}

const VisitHeader = ({ children, onClick, isPartialFilterView }: Props) => {
  return (
    <Flex direction="column" gap="1" className="bg-pp-bg-accent">
      <Flex className="bg-white" p="2" gap="3">
        <Text size="4" weight="medium">
          Visits
        </Text>
        {!isPartialFilterView && <ShowFiltersButton onClick={onClick} />}
      </Flex>
      {children}
    </Flex>
  )
}

export { VisitHeader }
