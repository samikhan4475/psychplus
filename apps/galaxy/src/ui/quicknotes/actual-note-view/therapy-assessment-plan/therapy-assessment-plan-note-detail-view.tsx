'use client'

import { transformIn } from '@/ui/assessment-plan/therapy-assessment-plan-tab/data'
import { NoteDetailProps } from '../types'
import { Details } from './details'

const TherapyAssessmentPlanNoteDetailView = ({ data }: NoteDetailProps) => {
  if (data?.length === 0) return null
  return <Details data={transformIn(data)} />
}

export { TherapyAssessmentPlanNoteDetailView }
