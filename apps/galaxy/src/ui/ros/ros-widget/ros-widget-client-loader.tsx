'use client'

import { QuickNoteSectionItem } from '@/types'
import { transformIn } from './data'
import { RosWidget } from './ros-widget'

interface RosWidgetProps {
  patientId: string
  data?: QuickNoteSectionItem[]
}

const RosWidgetClientLoader = ({ patientId, data }: RosWidgetProps) => {
  const initialValue = transformIn(data ?? [])

  return <RosWidget patientId={patientId} initialValue={initialValue} />
}

export { RosWidgetClientLoader }
