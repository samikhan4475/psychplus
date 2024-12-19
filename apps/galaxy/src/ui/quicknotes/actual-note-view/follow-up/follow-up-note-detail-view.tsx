'use client'

import { NoteDetailProps } from '../types'
import { Details } from './details'

const FollowUpNoteDetailView = ({ appointments }: NoteDetailProps) => {
  if (appointments?.length === 0) return null
  return <Details data={appointments || []} />
}

export { FollowUpNoteDetailView }
