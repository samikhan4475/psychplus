'use client'

import { NoteSectionName } from '@/features/note/constants'
import { LABELS, QUESTIONS } from '@/features/questionnaire/ui/ham-d/constants'
import { QuestionnairesView } from '../shared'

const HamD = () => {
  return (
    <QuestionnairesView
      title="HAM-D"
      labels={LABELS}
      questions={QUESTIONS}
      sectionName={NoteSectionName.NoteSectionHamD}
    />
  )
}

export { HamD }
