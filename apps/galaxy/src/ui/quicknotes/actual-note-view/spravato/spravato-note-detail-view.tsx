'use client'

import { transformIn } from '@/ui/procedures/spravato-tab/data'
import { NoteDetailProps } from '../types'
import { Details } from './details'

const SpravatoNoteDetailView = ({ data, appointment }: NoteDetailProps) => {
  if (data?.length === 0 && !appointment) return null
  return <Details data={transformIn(data)} appointmentData={appointment} />
}

export { SpravatoNoteDetailView }
