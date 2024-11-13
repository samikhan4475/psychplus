'use client'

import { QuickNoteSectionItem } from '@/types'
import { AddOnWidget } from '@/ui/add-on/add-on-widget/add-on-widget'
import { transformIn } from '../../add-on/add-on-widget/data'

interface AddOnViewProps {
  patientId: string
  addOnAssessementPlanData: QuickNoteSectionItem[]
}

const AddOnView = ({ patientId, addOnAssessementPlanData }: AddOnViewProps) => {
  const initialValue = transformIn(addOnAssessementPlanData)

  return <AddOnWidget patientId={patientId} initialValue={initialValue} />
}

export { AddOnView }
