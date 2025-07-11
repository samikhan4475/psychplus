'use client'

import React, { useEffect } from 'react'
import { CODESETS } from '@psychplus-v2/constants'
import { Flex } from '@radix-ui/themes'
import { Staff } from '@psychplus/user'
import { FeatureCard, LoadingPlaceholder } from '@/components-v2'
import { mapCodesetToOptions, useCodesetCodes } from '@/providers'
import { useStore } from '../store'
import { AddWaitlistButton } from './add-waitlist-button'
import { WaitlistTable } from './waitlist-table'
import { WaitlistTablePagination } from './waitlist-table-pagination'

const WaitlistView = ({ staff }: { staff?: Staff[] }) => {
  const { fetchWaitlists, loading, setStaff } = useStore()

  useEffect(() => {
    fetchWaitlists()
  }, [])

  useEffect(() => {
    if (staff) setStaff(staff ?? [])
  }, [staff])

  if (loading) return <LoadingPlaceholder />

  return (
    <Flex direction="column" gap="5">
      <FeatureCard
        title="Waitlist"
        containerClassName="border-none bg-transparent"
        contentClassName="gap-3 relative"
        showTitleInsideCard
        headerRight={<AddWaitlistButton />}
      >
        <WaitlistTable />
        <WaitlistTablePagination />
      </FeatureCard>
    </Flex>
  )
}

export { WaitlistView }
