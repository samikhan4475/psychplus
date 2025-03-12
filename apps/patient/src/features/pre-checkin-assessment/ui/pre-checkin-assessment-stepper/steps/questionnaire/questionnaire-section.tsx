'use client'

import { FormProvider } from 'react-hook-form'
import { NoteFormContainer } from '@/components-v2'
import { useProfileStore } from '@/features/account/profile/store'
import { NoteSectionName } from '@/features/note/constants/constants.ts'
import { useNoteStore } from '@/features/note/store'
import { NoteAccordion } from '@/features/note/ui'
import {
  getQuestionnaireMapping,
  getTotalQuestions,
  transformIn,
  transformOut,
  useQuestionnaireForm,
} from '@/features/questionnaire'

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

  const questionnaireData = getNoteData(name)
  const initialValue = transformIn(
    questionnaireData,
    name,
    getQuestionnaireMapping(name),
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
        isCompleted={questionnaireData?.length > 0}
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
