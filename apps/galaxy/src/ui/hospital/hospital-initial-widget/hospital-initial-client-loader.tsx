'use client'

import { QuickNoteSectionItem } from '@/types'
import { HospitalInitialTab } from './hospital-initial-tab'

interface HospitalInitialWidgetLoaderProps {
  patientId: string
  isHospitalInitialTab?: boolean
  data?: QuickNoteSectionItem[]
}

const HospitalInitialClientLoader = ({
  patientId,
  isHospitalInitialTab = false,
  data,
}: HospitalInitialWidgetLoaderProps) => {
  return (
    <HospitalInitialTab
      patientId={patientId}
      isHospitalInitialTab={isHospitalInitialTab}
      hospitalInitialData={data ?? []}
    />
  )
}

export { HospitalInitialClientLoader }
