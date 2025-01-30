'use client'

import { useEffect } from 'react'
import { Flex } from '@radix-ui/themes'
import { useStore as zustandUseStore } from 'zustand'
import { SelectOptionType } from '@/types'
import { AddCommentForm, TabContentHeading } from '../shared'
import { useStore } from '../store'
import { TreatmentDataTable } from './treatment-data-table'

const TAB_TITLE = 'Treatment'

interface TreatmentTabProps {
  staffOptions: SelectOptionType[]
}
const TreatmentTab = ({ staffOptions }: TreatmentTabProps) => {
  const store = useStore()
  const { treatmentComments, fetchComments, loading } = zustandUseStore(
    store,
    (state) => ({
      treatmentComments: state.treatmentComments,
      loading: state.loading,
      fetchComments: state.fetchComments,
    }),
  )
  useEffect(() => {
    fetchComments({ isTreatment: true, isBilling: false })
  }, [fetchComments])

  return (

      <Flex direction="column" gap="1">
        <TabContentHeading title={TAB_TITLE} />
        <AddCommentForm />
        <TreatmentDataTable
          comments={treatmentComments ?? []}
          staffOptions={staffOptions}
          loading={loading}
        />
      </Flex>
    
  )
}

export { TreatmentTab }
