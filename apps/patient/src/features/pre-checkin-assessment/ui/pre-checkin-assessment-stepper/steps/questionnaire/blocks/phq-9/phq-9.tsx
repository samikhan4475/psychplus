'use client'

import { NoteSectionName } from '@/features/note/constants'
import { NoteSectionItem } from '@/features/note/types'
import { LABELS, QUESTIONS } from '@/features/questionnaire/ui/phq-9/constants'
import { QuestionnairesView } from '../shared'

const Phq9 = ({ data }: { data: NoteSectionItem[] }) => {
  return (
    <QuestionnairesView
      title="PHQ-9"
      labels={LABELS}
      questions={QUESTIONS}
      data={data}
      sectionName={NoteSectionName.NoteSectionPhq9}
    />
  )
}

export { Phq9 }
