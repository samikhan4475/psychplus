'use client'

import { QuickNoteSectionItem } from '@/types'
import { EctWidget } from './ect-widget'

interface EctWidgetLoaderProps {
  patientId: string
  data?: QuickNoteSectionItem[]
}

const EctWidgetClientLoader = ({ patientId, data }: EctWidgetLoaderProps) => {
  return <EctWidget patientId={patientId} procedureEctData={data ?? []} />
}

export { EctWidgetClientLoader }
