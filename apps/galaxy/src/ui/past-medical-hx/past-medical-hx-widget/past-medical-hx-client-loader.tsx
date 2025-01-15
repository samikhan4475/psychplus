'use client'

import { QuickNoteSectionItem } from '@/types'
import { transformIn } from './data'
import { PastMedicalHxWidget } from './past-medical-hx-widget'

interface PastMedicalHxWidgetLoaderProps {
  patientId: string
  data?: QuickNoteSectionItem[]
}

const PastMedicalHxClientLoader = ({
  patientId,
  data = [],
}: PastMedicalHxWidgetLoaderProps) => {
  const initialValue = transformIn(data)

  return (
    <PastMedicalHxWidget patientId={patientId} initialValue={initialValue} />
  )
}

export { PastMedicalHxClientLoader }
