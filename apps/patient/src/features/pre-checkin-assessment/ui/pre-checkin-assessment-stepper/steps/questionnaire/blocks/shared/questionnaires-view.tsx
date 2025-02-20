'use client'

import React from 'react'
import { FormProvider } from 'react-hook-form'
import { NoteSectionName } from '@/features/note/constants/constants'
import { NoteData, NoteSectionItem } from '@/features/note/types/types'
import { NoteAccordion } from '@/features/note/ui/note-accordion'
import {
  QuestionnairesForm,
  useQuestionnaireForm,
} from '@/features/questionnaire/ui/shared'
import { transformIn } from '@/features/questionnaire/ui/shared/data'

interface QuestionnairesViewProps {
  title: string
  labels: string[]
  questions: NoteData[]
  data: NoteSectionItem[]
  sectionName: NoteSectionName
}

const QuestionnairesView = ({
  title,
  labels,
  questions,
  data,
  sectionName,
}: QuestionnairesViewProps) => {
  const totalQuestions = questions.length
  const initialValue = transformIn(data, sectionName)
  const { totalFilledQuestions, ...form } = useQuestionnaireForm(
    initialValue,
    totalQuestions,
  )
  const isCompleted = totalFilledQuestions === totalQuestions

  return (
    <FormProvider {...form}>
      <NoteAccordion
        title={title}
        isCompleted={isCompleted}
        data={questions}
        labels={labels}
        sectionName={sectionName}
        content={renderQuestionnaireForm}
      />
    </FormProvider>
  )
}

const renderQuestionnaireForm = (
  labels: string[],
  data: NoteData[],
  sectionName: NoteSectionName,
  handleSave: () => void,
) => (
  <QuestionnairesForm
    labels={labels}
    data={data}
    sectionName={sectionName}
    handleSave={handleSave}
  />
)

export { QuestionnairesView }
