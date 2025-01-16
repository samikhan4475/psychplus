'use client'

import { CODESETS } from '@/constants'
import { useCodesetCodes } from '@/hooks'
import { transformIn } from '@/ui/hpi/hpi-widget/data'
import { getPatientAge, getPatientFullName } from '@/utils'
import { NoteDetailProps } from '../types'
import { HpiNarration } from './hpi-narration'
import { getGenderValue } from './utils'

const HpiNoteDetailView = ({ data, patient }: NoteDetailProps) => {
  if (!data) return null
  if (!patient) return null

  const delusionTypeCodeset = useCodesetCodes(CODESETS.DelusionType)
  const hallucinationTypeCodeset = useCodesetCodes(CODESETS.HallucinationType)

  return (
    <HpiNarration
      patient={{
        name: getPatientFullName(patient.legalName),
        age: getPatientAge(patient.birthdate),
        gender: getGenderValue(patient.gender),
      }}
      symptoms={transformIn(data, true)}
      delusionTypeCodeset={delusionTypeCodeset}
      hallucinationTypeCodeset={hallucinationTypeCodeset}
    />
  )
}
  
export { HpiNoteDetailView }
