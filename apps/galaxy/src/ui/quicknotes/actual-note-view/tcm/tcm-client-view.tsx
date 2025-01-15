'use client'

import { QuickNoteSectionItem } from '@/types'
import { tmsKeys, transformIn } from '@/ui/assessment-plan/tcm-widget/data'
import { QuickNoteSectionName } from '../../constants'
import { ActualNoteDetailsWrapper } from '../shared'
import { Details } from './details'

type TcmProps = {
  data?: QuickNoteSectionItem[]
}

const TcmClientiew = ({ data }: TcmProps) => {
  return (
    <ActualNoteDetailsWrapper
      sectionName={QuickNoteSectionName.QuicknoteSectionTcm}
    >
      <Details keys={tmsKeys} data={transformIn(data ?? [])} />
    </ActualNoteDetailsWrapper>
  )
}

export { TcmClientiew }
