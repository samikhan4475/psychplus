'use client'

import { transformIn } from '@/ui/past-medical-hx/past-medical-hx-widget/data'
import { NoteDetailProps } from '../types'
import { Details } from './details'

const PastMedicalHxNoteDetailView = ({ data }: NoteDetailProps) => {
  if (data.length === 0) return null
  return <Details data={transformIn(data)} />
}

export { PastMedicalHxNoteDetailView }
