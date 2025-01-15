'use client'

import { Appointment, QuickNoteSectionItem } from '@/types'
import { transformIn } from '@/ui/procedures/tms-tab/data'
import { QuickNoteSectionName } from '../../constants'
import { ActualNoteDetailsWrapper } from '../shared'
import { Details } from './details'

type TmsDetailsProps = {
  appointment?: Appointment
  data?: QuickNoteSectionItem[]
}

const TmsDetailClientView = ({ data, appointment }: TmsDetailsProps) => {
  return (
    <ActualNoteDetailsWrapper sectionName={QuickNoteSectionName.ProcedureTMS}>
      <Details data={transformIn(data ?? [])} appointment={appointment} />
    </ActualNoteDetailsWrapper>
  )
}

export { TmsDetailClientView }
