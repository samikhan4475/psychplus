'use client'

import { NoteDetailProps } from '../types'
import { Details } from './details'

const AllergiesNoteDetailsView = ({ allergies }: NoteDetailProps) => {
  if (allergies?.length === 0) return null
  return <Details data={allergies || []} />
}

export { AllergiesNoteDetailsView }
