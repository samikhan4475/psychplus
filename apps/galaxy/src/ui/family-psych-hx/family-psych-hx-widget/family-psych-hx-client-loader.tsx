'use client'

import { QuickNoteSectionItem } from '@/types'
import { transformIn } from './data'
import { FamilyPsychHxWidget } from './family-psych-hx-widget'

interface FamilyPsychHxWidgetLoaderProps {
  patientId: string
  data?: QuickNoteSectionItem[]
}

const FamilyPsychHxClientLoader = ({
  patientId,
  data,
}: FamilyPsychHxWidgetLoaderProps) => {
  const initialValue = transformIn(data ?? [])

  return (
    <FamilyPsychHxWidget patientId={patientId} initialValue={initialValue} />
  )
}

export { FamilyPsychHxClientLoader }
