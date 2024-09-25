'use client'

import { useEffect } from 'react'
import { SelectOptionType } from '@/types'
import { AddCommentForm, TabContentHeading } from '../shared'
import { useStore } from '../store'
import { BillingDataTable } from './billing-data-table'

const TAB_TITLE = 'Billing'

interface BillingTabProps {
  patientId: string
  staffOptions: SelectOptionType[]
}
const BillingTab = ({ patientId, staffOptions }: BillingTabProps) => {
  const { billingComments, fetchComments, loading } = useStore((state) => ({
    billingComments: state.billingComments,
    loading: state.loading,
    fetchComments: state.fetchComments,
  }))

  useEffect(() => {
    fetchComments({ PatientId: patientId, IsTreatment: false, IsBilling: true })
  }, [])

  return (
    <>
      <TabContentHeading title={TAB_TITLE} />
      <AddCommentForm patientId={patientId} />
      <BillingDataTable
        comments={billingComments ?? []}
        staffOptions={staffOptions}
        patientId={patientId}
        loading={loading ?? false}
      />
    </>
  )
}

export { BillingTab }
