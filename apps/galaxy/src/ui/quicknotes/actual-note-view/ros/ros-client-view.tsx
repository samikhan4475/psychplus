'use client'

import { QuickNoteSectionItem } from '@/types'
import { transformIn } from '@/ui/ros/ros-widget/data'
import { QuickNoteSectionName } from '../../constants'
import { ActualNoteDetailsWrapper } from '../shared'
import { Details } from './details'

type ReviewOfSystemProps = {
  data?: QuickNoteSectionItem[]
}

const ReviewOfSystemClientView = ({ data }: ReviewOfSystemProps) => {
  return (
    <ActualNoteDetailsWrapper
      sectionName={QuickNoteSectionName.QuicknoteSectionReviewOfSystem}
    >
      <Details data={transformIn(data ?? [])} />
    </ActualNoteDetailsWrapper>
  )
}

export { ReviewOfSystemClientView }
