'use client'

import { Appointment, QuickNoteSectionItem } from '@/types'
import { transformIn } from '@/ui/procedures/tms-tab/data'
import { QuickNoteSectionName } from '../../constants'
import { ActualNoteDetailsWrapper } from '../shared'
import { Details } from './details'

type TmsDetailsProps = {
  appointment?: Appointment
  data?: QuickNoteSectionItem[]
  patientId:string
}

const TmsDetailClientView = ({ data, appointment,patientId }: TmsDetailsProps) => {
  return (
    <ActualNoteDetailsWrapper sectionName={QuickNoteSectionName.ProcedureTMS}>
      <Details data={transformIn(data ?? [], true)} appointment={appointment} patientId={patientId}/>
    </ActualNoteDetailsWrapper>
  )
}

export { TmsDetailClientView }
