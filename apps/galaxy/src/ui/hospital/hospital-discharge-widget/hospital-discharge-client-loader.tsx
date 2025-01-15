'use client'

import { QuickNoteSectionItem } from '@/types'
import { HospitalDischargeTab } from './hospital-discharge-tab'

interface HospitalDischargeWidgetProps {
  patientId: string
  isHospitalDischargeTab?: boolean
  data?: QuickNoteSectionItem[]
}

const HospitalDischargeClientLoader = ({
  patientId,
  isHospitalDischargeTab = false,
  data,
}: HospitalDischargeWidgetProps) => {
  return (
    <HospitalDischargeTab
      patientId={patientId}
      isHospitalDischargeTab={isHospitalDischargeTab}
      hospitalDischargeData={data ?? []}
    />
  )
}

export { HospitalDischargeClientLoader }
