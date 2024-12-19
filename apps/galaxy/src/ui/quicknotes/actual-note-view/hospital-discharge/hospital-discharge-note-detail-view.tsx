'use client'

import { transformIn } from '@/ui/hospital/hospital-discharge-widget/data'
import { NoteDetailProps } from '../types'
import { Details } from './details'

const HospitalDischargeNoteDetailView = ({ data }: NoteDetailProps) => {
  if (data?.length === 0) return null
  return <Details data={transformIn(data)} />
}

export { HospitalDischargeNoteDetailView }
