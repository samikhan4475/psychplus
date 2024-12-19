'use client'

import { transformIn } from '@/ui/family-psych-hx/family-psych-hx-widget/data'
import { NoteDetailProps } from '../types'
import { Details } from './details'

const FamilyPsychNoteDetailView = ({ data }: NoteDetailProps) => {
  if (data.length === 0) return null
  return <Details data={transformIn(data)} />
}

export { FamilyPsychNoteDetailView }
