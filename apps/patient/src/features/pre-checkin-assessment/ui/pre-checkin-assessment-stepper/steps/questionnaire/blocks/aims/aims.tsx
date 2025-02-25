'use client'

import { NoteSectionName } from '@/features/note/constants'
import { LABELS, QUESTIONS } from '@/features/questionnaire/ui/aims/constants'
import { QuestionnairesView } from '../shared'

const Aims = () => {
  return (
    <QuestionnairesView
      title="AIMS"
      labels={LABELS}
      questions={QUESTIONS}
      sectionName={NoteSectionName.NoteSectionAims}
    />
  )
}

export { Aims }
