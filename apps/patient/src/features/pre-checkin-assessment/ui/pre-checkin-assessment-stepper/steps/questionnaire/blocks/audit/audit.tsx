'use client'

import { NoteSectionName } from '@/features/note/constants'
import { NoteSectionItem } from '@/features/note/types'
import { LABELS, QUESTIONS } from '@/features/questionnaire/ui/audit/constants'
import { QuestionnairesView } from '../shared'

const Audit = ({ data }: { data: NoteSectionItem[] }) => {
  return (
    <QuestionnairesView
      title="AUDIT"
      labels={LABELS}
      questions={QUESTIONS}
      data={data}
      sectionName={NoteSectionName.NoteSectionAudit}
    />
  )
}

export { Audit }
