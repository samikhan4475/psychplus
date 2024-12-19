'use client'

import { transformIn } from '@/ui/past-psych-hx/past-psych-hx-widget/data'
import { NoteDetailProps } from '../types'
import { Details } from './details'

const PastPsychlNoteDetailView = ({ data }: NoteDetailProps) => {
  if (data.length === 0) return null
  return <Details data={transformIn(data)} />
}

export { PastPsychlNoteDetailView }
