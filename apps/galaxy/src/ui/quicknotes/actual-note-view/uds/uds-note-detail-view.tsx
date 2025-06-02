'use client'

import { transformIn } from '@/ui/uds/uds-widget/data'
import { NoteDetailProps } from '../types'
import { Details } from './details'

const UdsNoteDetailView = ({ data }: NoteDetailProps) => {
  if (data?.length === 0) return null
  return <Details data={transformIn(data ?? [], undefined, true)} />
}

export { UdsNoteDetailView }
