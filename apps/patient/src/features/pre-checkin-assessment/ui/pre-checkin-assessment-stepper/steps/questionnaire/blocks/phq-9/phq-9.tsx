'use client'

import { NoteSectionName } from '@/features/note/constants'
import { LABELS, QUESTIONS } from '@/features/questionnaire/ui/phq-9/constants'
import { QuestionnairesView } from '../shared'

const Phq9 = () => {
  return (
    <QuestionnairesView
      title="PHQ-9"
      labels={LABELS}
      questions={QUESTIONS}
      sectionName={NoteSectionName.NoteSectionPhq9}
    />
  )
}

export { Phq9 }
