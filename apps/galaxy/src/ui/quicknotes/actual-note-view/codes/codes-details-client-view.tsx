'use client'

import { Appointment, QuickNoteSectionItem } from '@/types'
import { transformIn } from '@/ui/codes/codes-widget/data'
import { QuickNoteSectionName } from '../../constants'
import { ActualNoteDetailsWrapper } from '../shared'
import { Details } from './details'

type CodesDetailsViewProps = {
  appointment: Appointment
  data?: QuickNoteSectionItem[]
}

const CodesDetailsClientView = ({
  appointment,
  data,
}: CodesDetailsViewProps) => {
  const codesdata = transformIn(data ?? [])
  return (
    <ActualNoteDetailsWrapper
      sectionName={QuickNoteSectionName.QuicknoteSectionCodes}
    >
      <Details data={codesdata} appointment={appointment} />
    </ActualNoteDetailsWrapper>
  )
}

export { CodesDetailsClientView }
