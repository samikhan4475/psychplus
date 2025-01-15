'use client'

import { Appointment, QuickNoteSectionItem } from '@/types'
import { transformIn } from '@/ui/procedures/spravato-tab/data'
import { QuickNoteSectionName } from '../../constants'
import { ActualNoteDetailsWrapper } from '../shared'
import { Details } from './details'

type SpravatoDetailsProps = {
  appointment?: Appointment
  data?: QuickNoteSectionItem[]
}

const SpravatoDetailClientView = ({
  data,
  appointment,
}: SpravatoDetailsProps) => {
  return (
    <ActualNoteDetailsWrapper
      sectionName={QuickNoteSectionName.QuicknoteSectionProcedureSpravato}
    >
      <Details data={transformIn(data ?? [])} appointmentData={appointment} />
    </ActualNoteDetailsWrapper>
  )
}

export { SpravatoDetailClientView }
