'use client'

import { transformIn } from '@/ui/assessment-plan/family-internal-medicine-assessment-plan-tab/data'
import { NoteDetailProps } from '../types'
import { Details } from './details'

const FamilyInternalMedicineAssessmentPlanNoteDetailView = ({
  data,
}: NoteDetailProps) => {
  if (data?.length === 0) return null
  return <Details data={transformIn(data)} />
}

export { FamilyInternalMedicineAssessmentPlanNoteDetailView }
