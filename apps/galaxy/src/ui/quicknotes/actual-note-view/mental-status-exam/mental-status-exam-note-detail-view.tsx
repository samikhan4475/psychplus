'use client'

import { transformIn } from '@/ui/mse/mse-widget/data'
import { NoteDetailProps } from '../types'
import { Details } from './details'

const MentalStatusExamNoteDetailView = ({ data }: NoteDetailProps) => {
  if (data.length === 0) return null
  return <Details data={transformIn(data)} />
}

export { MentalStatusExamNoteDetailView }
