import React from 'react'
import { NoteFormContainer } from '@/components-v2'
import { useProfileStore } from '@/features/account/profile/store'
import { NoteSectionName } from '@/features/note/constants'
import { NoteData } from '@/features/note/types'
import { transformOut } from '@/features/questionnaire/ui/shared/data'
import { QuestionnaireTable } from '@/features/questionnaire/ui/shared/questionnaire-table'

interface QuestionnairesFormProps {
  data: NoteData[]
  labels: string[]
  isEdit?: boolean
  handleSave?: () => void
  sectionName: NoteSectionName
  showNumbering?: boolean
}

const QuestionnaireForm = ({
  data,
  labels,
  isEdit = true,
  handleSave,
  sectionName,
  showNumbering = true,
}: QuestionnairesFormProps) => {
  const { profile } = useProfileStore((state) => ({
    profile: state.profile,
  }))

  return (
    <NoteFormContainer
      getData={transformOut(String(profile.id), sectionName)}
      onSave={handleSave}
      isEdit={isEdit}
    >
      <QuestionnaireTable
        labels={labels}
        data={data}
        disabled={!isEdit}
        showNumbering={showNumbering}
      />
    </NoteFormContainer>
  )
}

export { QuestionnaireForm }
