'use client'

import { NoteSectionName } from '@/features/note/constants'
import { LABELS, QUESTIONS } from '@/features/questionnaire/ui/pcl-5/constants'
import { QuestionnairesView } from '../shared'

const Pcl5 = () => {
  return (
    <QuestionnairesView
      title="PCL-5"
      labels={LABELS}
      questions={QUESTIONS}
      sectionName={NoteSectionName.NoteSectionPcl5}
    />
  )
}

export { Pcl5 }
