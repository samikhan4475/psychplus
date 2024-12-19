'use client'

import { tmsKeys, transformIn } from '@/ui/assessment-plan/tcm-widget/data'
import { NoteDetailProps } from '../types'
import { Details } from './details'

const TcmNoteDetailView = ({ data }: NoteDetailProps) => {
  if (data?.length === 0) return null
  return <Details keys={tmsKeys} data={transformIn(data)} />
}

export { TcmNoteDetailView }
