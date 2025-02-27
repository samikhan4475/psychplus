'use client'

import { transformIn } from '@/ui/procedures/tms-tab/data'
import { NoteDetailProps } from '../types'
import { Details } from './details'

const TmsNoteDetailView = ({ data, patientId }: NoteDetailProps) => {
  if (data?.length === 0) return null
  return <Details data={transformIn(data ?? [], true)} patientId={patientId} />
}

export { TmsNoteDetailView }
