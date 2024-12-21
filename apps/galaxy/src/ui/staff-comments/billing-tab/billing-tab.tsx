'use client'

import { useEffect } from 'react'
import { useStore as zustandUseStore } from 'zustand'
import { SelectOptionType } from '@/types'
import { AddCommentForm, TabContentHeading } from '../shared'
import { useStore } from '../store'
import { BillingDataTable } from './billing-data-table'

const TAB_TITLE = 'Billing'

interface BillingTabProps {
  staffOptions: SelectOptionType[]
}
const BillingTab = ({ staffOptions }: BillingTabProps) => {
  const store = useStore()
  const { billingComments, fetchComments, loading } = zustandUseStore(
    store,
    (state) => ({
      billingComments: state.billingComments,
      loading: state.loading,
      fetchComments: state.fetchComments,
    }),
  )

  useEffect(() => {
    fetchComments({ isBilling: true, isTreatment: false })
  }, [fetchComments])

  return (
    <>
      <TabContentHeading title={TAB_TITLE} />
      <AddCommentForm />
      <BillingDataTable
        comments={billingComments ?? []}
        staffOptions={staffOptions}
        loading={loading ?? false}
      />
    </>
  )
}

export { BillingTab }
