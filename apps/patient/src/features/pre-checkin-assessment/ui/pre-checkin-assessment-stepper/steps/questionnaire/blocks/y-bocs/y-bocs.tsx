'use client'

import { NoteSectionName } from '@/features/note/constants'
import { LABELS, QUESTIONS } from '@/features/questionnaire/ui/y-bocs/constants'
import { QuestionnairesView } from '../shared'

const Ybocs = () => {
  return (
    <QuestionnairesView
      title="Y-BOCS"
      labels={LABELS}
      questions={QUESTIONS}
      sectionName={NoteSectionName.NoteSectionYbocs}
      showNumbering={false}
    />
  )
}

export { Ybocs }
