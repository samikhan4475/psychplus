'use client'

import { QuickNoteSectionItem } from '@/types'
import { transformIn } from '@/ui/hospital/hospital-initial-widget/data'
import { QuickNoteSectionName } from '../../constants'
import { ActualNoteDetailsWrapper } from '../shared'
import { Details } from './details'

type HospitalInitialProps = {
  data?: QuickNoteSectionItem[]
}

const HospitalInitialClientView = ({ data }: HospitalInitialProps) => {
  return (
    <ActualNoteDetailsWrapper
      sectionName={QuickNoteSectionName.QuickNoteSectionHospitalInitial}
    >
      <Details data={transformIn(data ?? [])} />
    </ActualNoteDetailsWrapper>
  )
}

export { HospitalInitialClientView }
