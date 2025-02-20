'use client'

import { NoteSectionName } from '@/features/note/constants'
import { NoteSectionItem } from '@/features/note/types'
import { LABELS, QUESTIONS } from '@/features/questionnaire/ui/ham-d/constants'
import { QuestionnairesView } from '../shared'

const HamD = ({ data }: { data: NoteSectionItem[] }) => {
  return (
    <QuestionnairesView
      title="HAM-D"
      labels={LABELS}
      questions={QUESTIONS}
      data={data}
      sectionName={NoteSectionName.NoteSectionHamD}
    />
  )
}

export { HamD }
