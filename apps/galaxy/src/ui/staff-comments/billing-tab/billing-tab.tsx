'use client'

import { useEffect } from 'react'
import { Flex, ScrollArea } from '@radix-ui/themes'
import { TabContentHeading, ViewLoadingPlaceholder } from '../shared'
import { useStore } from '../store'
import { BillingDataTable } from './billing-data-table'
import { AddNewCommentForm } from './new-comment-form'

const TAB_TITLE = 'Billing'

interface BillingTabProps {
  patientId: string
}
const BillingTab = ({ patientId }: BillingTabProps) => {
  const { data, fetch, loading } = useStore((state) => ({
    data: state.data,
    loading: state.loading,
    fetch: state.fetch,
  }))

  useEffect(() => {
    fetch()
  }, [])

  if (loading) {
    return <ViewLoadingPlaceholder title={TAB_TITLE} />
  }

  return (
    <>
      <TabContentHeading title={TAB_TITLE} />
      <ScrollArea type="always">
        <Flex direction={'column'} className="gap-0.5 p-[1px]" width={'100%'}>
          <AddNewCommentForm />
          <BillingDataTable comments={data?.comments ?? []} />
        </Flex>
      </ScrollArea>
    </>
  )
}

export { BillingTab }
