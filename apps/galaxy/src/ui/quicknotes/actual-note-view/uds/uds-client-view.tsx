'use client'

import { QuickNoteSectionItem } from '@/types'
import { transformIn } from '@/ui/uds/uds-widget/data'
import { QuickNoteSectionName } from '../../constants'
import { ActualNoteDetailsWrapper } from '../shared'
import { Details } from './details'

type UdsDetailsProps = {
  data?: QuickNoteSectionItem[]
}

const UdsClientView = ({ data }: UdsDetailsProps) => {
  return (
    <ActualNoteDetailsWrapper
      sectionName={QuickNoteSectionName.QuicknoteSectionUds}
    >
      <Details data={transformIn(data ?? [], undefined, true)} />
    </ActualNoteDetailsWrapper>
  )
}

export { UdsClientView }
