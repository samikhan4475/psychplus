'use client'

import { transformIn } from '@/ui/therapy/therapy-widget/data'
import { NoteDetailProps } from '../types'
import { Details } from './details'

const TherapyNoteDetailView = ({ data }: NoteDetailProps) => {
  if (data?.length === 0) return null
  return <Details data={transformIn(data)} />
}

export { TherapyNoteDetailView }
