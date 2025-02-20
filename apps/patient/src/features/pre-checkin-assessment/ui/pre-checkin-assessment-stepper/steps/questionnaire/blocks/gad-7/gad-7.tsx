'use client'

import { NoteSectionName } from '@/features/note/constants'
import { NoteSectionItem } from '@/features/note/types'
import { LABELS, QUESTIONS } from '@/features/questionnaire/ui/gad-7/constants'
import { QuestionnairesView } from '../shared'

const Gad7 = ({ data }: { data: NoteSectionItem[] }) => {
  return (
    <QuestionnairesView
      title="GAD-7"
      labels={LABELS}
      questions={QUESTIONS}
      data={data}
      sectionName={NoteSectionName.NoteSectionGad7}
    />
  )
}

export { Gad7 }
