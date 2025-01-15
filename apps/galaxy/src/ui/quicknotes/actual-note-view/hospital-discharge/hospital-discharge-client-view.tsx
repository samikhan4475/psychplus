'use client'

import { QuickNoteSectionItem } from '@/types'
import { transformIn } from '@/ui/hospital/hospital-discharge-widget/data'
import { QuickNoteSectionName } from '../../constants'
import { ActualNoteDetailsWrapper } from '../shared'
import { Details } from './details'

type HospitalDischargeProps = {
  data?: QuickNoteSectionItem[]
}

const HospitalDischargeClientView = ({ data }: HospitalDischargeProps) => {
  return (
    <ActualNoteDetailsWrapper
      sectionName={QuickNoteSectionName.QuicknoteSectionHospitalDischarge}
    >
      <Details data={transformIn(data ?? [])} />
    </ActualNoteDetailsWrapper>
  )
}

export { HospitalDischargeClientView }
