'use client'

import { NoteSectionName } from '@/features/note/constants'
import { NoteSectionItem } from '@/features/note/types'
import { LABELS, QUESTIONS } from '@/features/questionnaire/ui/pcl-5/constants'
import { QuestionnairesView } from '../shared'

const Pcl5 = ({ data }: { data: NoteSectionItem[] }) => {
  return (
    <QuestionnairesView
      title="PCL-5"
      labels={LABELS}
      questions={QUESTIONS}
      data={data}
      sectionName={NoteSectionName.NoteSectionPcl5}
    />
  )
}

export { Pcl5 }
