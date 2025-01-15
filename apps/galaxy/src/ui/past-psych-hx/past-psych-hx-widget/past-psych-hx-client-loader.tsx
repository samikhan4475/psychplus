'use client'

import { QuickNoteSectionItem } from '@/types'
import { transformIn } from './data'
import { PastPsychHxWidget } from './past-psych-hx-widget'

interface PastPsychHxWidgetLoaderProps {
  patientId: string
  data?: QuickNoteSectionItem[]
}

const PastPsychHxClientLoader = ({
  patientId,
  data,
}: PastPsychHxWidgetLoaderProps) => {
  const initialValue = transformIn(data ?? [])

  return <PastPsychHxWidget patientId={patientId} initialValue={initialValue} />
}

export { PastPsychHxClientLoader }
