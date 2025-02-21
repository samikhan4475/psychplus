'use client'

import { QuickNoteSectionItem } from '@/types'
import { transformIn } from '@/ui/add-on/add-on-widget/data'
import { QuickNoteSectionName } from '../../constants'
import { ActualNoteDetailsWrapper } from '../shared'
import { Details } from './details'

type AddOnClientViewProps = {
  data?: QuickNoteSectionItem[]
  visitType?: string
}

const AddOnClientView = ({ visitType, data = [] }: AddOnClientViewProps) => {
  const addOndata = transformIn(data, [], visitType)

  return (
    <ActualNoteDetailsWrapper sectionName={QuickNoteSectionName.Addon}>
      <Details data={addOndata} />
    </ActualNoteDetailsWrapper>
  )
}

export { AddOnClientView }
