'use client'

import { QuickNoteSectionItem } from '@/types'
import { transformIn } from './data'
import { SubstanceUseHxWidget } from './substance-use-widget'

interface SubstanceUseHxWidgetLoaderProps {
  patientId: string
  data?: QuickNoteSectionItem[]
}

const SubstanceUseHxClientLoader = ({
  patientId,
  data,
}: SubstanceUseHxWidgetLoaderProps) => {
  const initialValue = transformIn(data ?? [])

  return (
    <SubstanceUseHxWidget patientId={patientId} initialValue={initialValue} />
  )
}

export { SubstanceUseHxClientLoader }
