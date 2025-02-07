'use client'

import { QuickNoteSectionItem } from '@/types'
import { filterAndSort } from '@/utils'
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
  const [hpiData, restData] = filterAndSort(data ?? [], 'hpiOther')
  const initialValue = transformIn(hpiData)

  return (
    <HpiWidget
      patientId={patientId}
      initialValue={initialValue}
      isHpiHeader={isHpiHeader}
      otherData={restData}
    />
  )
}

export { HpiWidgetClientLoader }
