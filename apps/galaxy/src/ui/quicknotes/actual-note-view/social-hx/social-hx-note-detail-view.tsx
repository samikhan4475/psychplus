'use client'

import { transformIn } from '@/ui/social-hx/social-hx-widget/data'
import { NoteDetailProps } from '../types'
import { Details } from './details'

const SocialHxNoteDetailView = ({ data }: NoteDetailProps) => {
  if (data.length === 0) return null
  return <Details data={transformIn(data)} />
}

export { SocialHxNoteDetailView }
