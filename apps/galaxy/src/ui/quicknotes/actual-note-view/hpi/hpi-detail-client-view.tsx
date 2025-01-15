'use client'

import { PatientProfile, QuickNoteSectionItem } from '@/types'
import { transformIn } from '@/ui/hpi/hpi-widget/data'
import { getPatientAge, getPatientFullName } from '@/utils'
import { QuickNoteSectionName } from '../../constants'
import { ActualNoteDetailsWrapper } from '../shared'
import { HpiNarration } from './hpi-narration'
import { getGenderValue } from './utils'

interface HpiProps {
  data?: QuickNoteSectionItem[]
  patient: PatientProfile
}

const HpiDetailClientView = ({ data, patient }: HpiProps) => {
  const { legalName, birthdate, gender } = patient

  return (
    <ActualNoteDetailsWrapper
      sectionName={QuickNoteSectionName.QuicknoteSectionHPI}
    >
      <HpiNarration
        patient={{
          name: getPatientFullName(legalName),
          age: getPatientAge(birthdate),
          gender: getGenderValue(gender),
        }}
        symptoms={transformIn(data ?? [], true)}
      />
    </ActualNoteDetailsWrapper>
  )
}

export { HpiDetailClientView }
