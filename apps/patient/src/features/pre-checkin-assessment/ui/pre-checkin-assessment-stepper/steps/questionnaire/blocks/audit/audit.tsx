'use client'

import { NoteSectionName } from '@/features/note/constants'
import { LABELS, QUESTIONS } from '@/features/questionnaire/ui/audit/constants'
import { QuestionnairesView } from '../shared'

const Audit = () => {
  return (
    <QuestionnairesView
      title="AUDIT"
      labels={LABELS}
      questions={QUESTIONS}
      sectionName={NoteSectionName.NoteSectionAudit}
    />
  )
}

export { Audit }
