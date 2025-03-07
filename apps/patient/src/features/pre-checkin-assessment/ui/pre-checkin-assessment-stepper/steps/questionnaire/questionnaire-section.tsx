'use client'

import { FormProvider } from 'react-hook-form'
import { NoteFormContainer } from '@/components-v2'
import { useProfileStore } from '@/features/account/profile/store'
import { NoteSectionName } from '@/features/note/constants/constants.ts'
import { useNoteStore } from '@/features/note/store'
import { NoteAccordion } from '@/features/note/ui'
import {
  getTotalQuestions,
  transformIn,
  transformOut,
  useQuestionnaireForm,
} from '@/features/questionnaire'
import { result as mocaMapping } from '@/features/questionnaire/ui/moca'

const QuestionnaireSection = ({
  name,
  title,
  component,
}: {
  name: NoteSectionName
  title: string
  component: React.FC
}) => {
  const getNoteData = useNoteStore((state) => state.getNoteData)
  const profileId = useProfileStore((state) => state.profile.id)

  const questionnaireMapping =
    name === NoteSectionName.NoteSectionMoca ? mocaMapping : {}
  const initialValue = transformIn(
    getNoteData(name),
    name,
    questionnaireMapping,
  )
  const totalQuestions = getTotalQuestions(name)
  const { totalFilledQuestions, ...form } = useQuestionnaireForm(
    initialValue,
    totalQuestions as number,
  )

  return (
    <FormProvider {...form}>
      <NoteAccordion
        title={title}
        isCompleted={totalFilledQuestions === totalQuestions}
        content={(props) =>
          renderQuestionnaireSection({
            ...props,
            sectionName: name,
            patientId: String(profileId),
            Component: component,
          })
        }
      />
    </FormProvider>
  )
}

const renderQuestionnaireSection = ({
  sectionName,
  handleSave,
  isEdit = true,
  patientId,
  Component,
}: {
  sectionName: string
  handleSave: () => void
  isEdit?: boolean
  patientId: string
  Component: React.FC
}) => (
  <NoteFormContainer
    getData={transformOut(patientId, sectionName as NoteSectionName)}
    onSave={handleSave}
    isEdit={isEdit}
  >
    <Component />
  </NoteFormContainer>
)

export { QuestionnaireSection }
