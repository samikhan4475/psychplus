'use client'

import { useEffect } from 'react'
import { Flex, ScrollArea } from '@radix-ui/themes'
import { TabContentHeading } from '../shared'
import { useStore } from '../store'
import { AddCommentForm } from './add-comment-form'
import { TreatmentDataTable } from './treatment-data-table'

const TAB_TITLE = 'Treatment'

interface TreatmentTabProps {
  patientId: string
}
const TreatmentTab = ({ patientId }: TreatmentTabProps) => {
  const { data, fetch } = useStore((state) => ({
    data: state.data,
    loading: state.loading,
    fetch: state.fetch,
  }))

  useEffect(() => {
    fetch()
  }, [])

  return (
    <>
      <TabContentHeading title={TAB_TITLE} />
      <ScrollArea type="always">
        <Flex direction={'column'} className="gap-0.5 p-[1px]" width="100%">
          <AddCommentForm />
          <TreatmentDataTable comments={data?.comments ?? []} />
        </Flex>
      </ScrollArea>
    </>
  )
}

export { TreatmentTab }
