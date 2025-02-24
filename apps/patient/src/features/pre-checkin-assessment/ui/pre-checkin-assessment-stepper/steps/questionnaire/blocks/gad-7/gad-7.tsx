'use client'

import { NoteSectionName } from '@/features/note/constants'
import { LABELS, QUESTIONS } from '@/features/questionnaire/ui/gad-7/constants'
import { QuestionnairesView } from '../shared'

const Gad7 = () => {
  return (
    <QuestionnairesView
      title="GAD-7"
      labels={LABELS}
      questions={QUESTIONS}
      sectionName={NoteSectionName.NoteSectionGad7}
    />
  )
}

export { Gad7 }
