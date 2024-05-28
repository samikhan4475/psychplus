'use client'

import { useRef } from 'react'
import { Flex } from '@radix-ui/themes'
import { PreferredPartnersTable } from './components/preferred-partners-table'

const PreferredPartnersListWidgetClient = () => {
  const ref = useRef<HTMLDivElement>(null)

  return (
    <Flex direction="column" className="h-fit min-w-fit" ref={ref}>
      <PreferredPartnersTable />
    </Flex>
  )
}

export { PreferredPartnersListWidgetClient }
