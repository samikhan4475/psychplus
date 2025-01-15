'use client'

import { QuickNoteSectionItem } from '@/types'
import { transformIn } from '@/ui/procedures/ect-tab/data'
import { QuickNoteSectionName } from '../../constants'
import { ActualNoteDetailsWrapper } from '../shared'
import { Details } from './details'

type EctDetailsProps = {
  data?: QuickNoteSectionItem[]
}

const EctDetailClientView = ({ data }: EctDetailsProps) => {
  return (
    <ActualNoteDetailsWrapper
      sectionName={QuickNoteSectionName.QuicknoteSectionProcedureEtcTab}
    >
      <Details data={transformIn(data ?? [])} />
    </ActualNoteDetailsWrapper>
  )
}

export { EctDetailClientView }
