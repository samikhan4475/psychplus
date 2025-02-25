'use client'

import { NoteSectionName } from '@/features/note/constants'
import {
  LABELS,
  QUESTIONS,
} from '@/features/questionnaire/ui/snap-iv/constants'
import { QuestionnairesView } from '../shared'

const SnapIv = () => {
  return (
    <QuestionnairesView
      title="SNAP-IV"
      labels={LABELS}
      questions={QUESTIONS}
      sectionName={NoteSectionName.NoteSectionSnapIV}
    />
  )
}

export { SnapIv }
