'use client'

import { NoteSectionName } from '@/features/note/constants'
import { NoteSectionItem } from '@/features/note/types'
import {
  LABELS,
  QUESTIONS,
} from '@/features/questionnaire/ui/dast-10/constants'
import { QuestionnairesView } from '../shared'

const Dast10 = ({ data }: { data: NoteSectionItem[] }) => {
  return (
    <QuestionnairesView
      title="DAST-10"
      labels={LABELS}
      questions={QUESTIONS}
      data={data}
      sectionName={NoteSectionName.NoteSectionDast10}
    />
  )
}

export { Dast10 }
