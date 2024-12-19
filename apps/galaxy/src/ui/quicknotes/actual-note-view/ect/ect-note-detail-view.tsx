'use client'

import { transformIn } from '@/ui/procedures/ect-tab/data'
import { NoteDetailProps } from '../types'
import { Details } from './details'

const EctNoteDetailView = ({ data }: NoteDetailProps) => {
  if (data?.length === 0) return null
  return <Details data={transformIn(data)} />
}

export { EctNoteDetailView }
