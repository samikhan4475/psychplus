'use client'

import { NoteSectionName } from '@/features/note/constants'
import {
  LABELS,
  QUESTIONS,
} from '@/features/questionnaire/ui/dast-10/constants'
import { QuestionnairesView } from '../shared'

const Dast10 = () => {
  return (
    <QuestionnairesView
      title="DAST-10"
      labels={LABELS}
      questions={QUESTIONS}
      sectionName={NoteSectionName.NoteSectionDast10}
    />
  )
}

export { Dast10 }
