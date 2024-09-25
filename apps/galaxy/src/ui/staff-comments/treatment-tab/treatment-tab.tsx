'use client'

import { useEffect } from 'react'
import { SelectOptionType } from '@/types'
import { AddCommentForm, TabContentHeading } from '../shared'
import { useStore } from '../store'
import { TreatmentDataTable } from './treatment-data-table'

const TAB_TITLE = 'Treatment'

interface TreatmentTabProps {
  patientId: string
  staffOptions: SelectOptionType[]
}
const TreatmentTab = ({ patientId, staffOptions }: TreatmentTabProps) => {
  const { treatmentComments, fetchComments, loading } = useStore((state) => ({
    treatmentComments: state.treatmentComments,
    loading: state.loading,
    fetchComments: state.fetchComments,
  }))

  useEffect(() => {
    fetchComments({ PatientId: patientId, IsTreatment: true, IsBilling: false })
  }, [])

  return (
    <>
      <TabContentHeading title={TAB_TITLE} />
      <AddCommentForm patientId={patientId} />
      <TreatmentDataTable
        comments={treatmentComments ?? []}
        staffOptions={staffOptions}
        patientId={patientId}
        loading={loading}
      />
    </>
  )
}

export { TreatmentTab }
