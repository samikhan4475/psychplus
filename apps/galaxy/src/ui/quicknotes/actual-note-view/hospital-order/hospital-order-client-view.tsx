'use client'

import { QuickNoteSectionItem } from '@/types'
import { transformIn } from '@/ui/hospital-orders/hospital-orders-widget/data'
import { QuickNoteSectionName } from '../../constants'
import { ActualNoteDetailsWrapper } from '../shared'
import { Details } from './details'

type HospitalOrderProps = {
  data?: QuickNoteSectionItem[]
}

const HospitalOrderClientView = ({ data }: HospitalOrderProps) => {
  return (
    <ActualNoteDetailsWrapper
      sectionName={QuickNoteSectionName.QuickNoteSectionHospitalOrders}
    >
      <Details data={transformIn(data ?? [])} />
    </ActualNoteDetailsWrapper>
  )
}

export { HospitalOrderClientView }
