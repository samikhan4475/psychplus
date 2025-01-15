'use client'

import { QuickNoteSectionItem } from '@/types'
import { transformIn } from './data'
import { SocialHxWidget } from './social-hx-widget'

interface SocialHxWidgetLoaderProps {
  patientId: string
  data?: QuickNoteSectionItem[]
}

const SocialHxClientLoader = ({
  patientId,
  data,
}: SocialHxWidgetLoaderProps) => {
  const initialValue = transformIn(data ?? [])

  return <SocialHxWidget patientId={patientId} initialValue={initialValue} />
}

export { SocialHxClientLoader }
