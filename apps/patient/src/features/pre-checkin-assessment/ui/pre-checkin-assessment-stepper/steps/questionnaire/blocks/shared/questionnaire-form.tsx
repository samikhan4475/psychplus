import React from 'react'
import { useSearchParams } from 'next/navigation'
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
  classNameHeaderCell?: string
  classNameCell?: string
}

const QuestionnaireForm = ({
  data,
  labels,
  isEdit = true,
  handleSave,
  sectionName,
  classNameHeaderCell,
  classNameCell,
}: QuestionnairesFormProps) => {
  const params = useSearchParams()
  const appointmentId = params.get('id')
  const { profile } = useProfileStore((state) => ({
    profile: state.profile,
  }))

  return (
    <NoteFormContainer
      getData={transformOut(
        String(profile.id),
        String(appointmentId),
        sectionName,
      )}
      onSave={handleSave}
      isEdit={isEdit}
    >
      <QuestionnaireTable
        labels={labels}
        data={data}
        classNameHeaderCell={classNameHeaderCell}
        classNameCell={classNameCell}
        disabled={!isEdit}
      />
    </NoteFormContainer>
  )
}

export { QuestionnaireForm }
