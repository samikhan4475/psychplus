'use client'

import { transformIn } from '@/ui/substance-use-hx/substance-use-hx-widget/data'
import { NoteDetailProps } from '../types'
import { Details } from './details'

const SubstanceUseHxNoteDetailView = ({ data, patient }: NoteDetailProps) => {
  if (data.length === 0) return null
  return (
    <Details
      sectionName="Substance Use History"
      data={transformIn(data)}
      patient={patient}
    />
  )
}

export { SubstanceUseHxNoteDetailView }
