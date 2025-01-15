'use client'

import { QuickNoteSectionItem } from '@/types'
import { transformIn } from './data'
import { HpiWidget } from './hpi-widget'

interface HpiWidgetLoaderProps {
  patientId: string
  isHpiHeader?: boolean
  data?: QuickNoteSectionItem[]
}

const HpiWidgetClientLoader = ({
  patientId,
  isHpiHeader,
  data = [],
}: HpiWidgetLoaderProps) => {
  const initialValue = transformIn(data)

  return (
    <HpiWidget
      patientId={patientId}
      initialValue={initialValue}
      isHpiHeader={isHpiHeader}
    />
  )
}

export { HpiWidgetClientLoader }
