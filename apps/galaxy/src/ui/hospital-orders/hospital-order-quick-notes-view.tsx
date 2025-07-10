'use client'

import { QuickNoteSectionItem } from '@/types'
import { HospitalWidget } from './hospital-orders-widget/hospital-orders-widget'

const HospitalOrderQuickNotesView = ({
  patientId,
  data,
}: {
  patientId: string
  data?: QuickNoteSectionItem[]
}) => {
  return (
    <HospitalWidget
      patientId={patientId}
      title="Hospital Orders"
      data={data ?? []}
    />
  )
}

export { HospitalOrderQuickNotesView }
