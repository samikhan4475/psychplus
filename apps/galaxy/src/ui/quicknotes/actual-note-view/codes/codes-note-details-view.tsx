'use client'

import React from 'react'
import { transformIn } from '@/ui/codes/codes-widget/data'
import { NoteDetailProps } from '../types'
import { Details } from './details'

const CodesNoteDetailsView = ({ appointment, data }: NoteDetailProps) => {
  const transformedData = transformIn(data ?? [])

  if (!appointment) return null
  return (
    <Details
      data={transformedData}
      appointment={appointment}
      isNoteDetailView
    />
  )
}

export { CodesNoteDetailsView }
