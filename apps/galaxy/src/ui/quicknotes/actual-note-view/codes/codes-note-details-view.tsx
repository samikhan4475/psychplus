'use client'

import React from 'react'
import { transformIn } from '@/ui/codes/codes-widget/data'
import { NoteDetailProps } from '../types'
import { Details } from './details'

const CodesNoteDetailsView = ({ appointment, data }: NoteDetailProps) => {
  const transformedData = transformIn(data)

  if (
    transformedData?.cptPrimaryCodes.length === 0 &&
    transformedData?.cptmodifierCodes.length === 0 &&
    transformedData?.cptAddonCodes.length === 0
  )
    return null
  if (!appointment) return null
  return <Details data={transformedData} appointment={appointment} />
}

export { CodesNoteDetailsView }
