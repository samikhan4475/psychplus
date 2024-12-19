'use client'

import { transformIn } from '@/ui/physical-exam/physical-exam-widget/data'
import { NoteDetailProps } from '../types'
import { Details } from './details'

const PhysicalExamNoteDetailView = ({ data }: NoteDetailProps) => {
  if (data.length === 0) return null
  return <Details data={transformIn(data)} />
}

export { PhysicalExamNoteDetailView }
