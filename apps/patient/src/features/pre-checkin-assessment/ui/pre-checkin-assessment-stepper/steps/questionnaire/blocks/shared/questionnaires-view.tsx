'use client'

import React, { useMemo } from 'react'
import { FormProvider } from 'react-hook-form'
import { NoteSectionName } from '@/features/note/constants/constants'
import { useNoteStore } from '@/features/note/store'
import { NoteData } from '@/features/note/types/types'
import {
  NoteAccordion,
  NoteAccordionContentProps,
} from '@/features/note/ui/note-accordion'
import { useQuestionnaireForm } from '@/features/questionnaire/ui/shared'
import { transformIn } from '@/features/questionnaire/ui/shared/data'
import { QuestionnaireForm } from './questionnaire-form'

interface QuestionnairesViewProps {
  title: string
  labels: string[]
  questions: NoteData[]
  sectionName: NoteSectionName
  showNumbering?: boolean
}

const QuestionnairesView = ({
  title,
  labels,
  questions,
  sectionName,
  showNumbering = true,
}: QuestionnairesViewProps) => {
  const getNoteData = useNoteStore((state) => state.getNoteData)
  const data = getNoteData(sectionName)
  const totalQuestions = questions.length
  const initialValue = useMemo(
    () => transformIn(data, sectionName),
    [data, sectionName],
  )
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
        showNumbering={showNumbering}
      />
    </FormProvider>
  )
}

const renderQuestionnaireForm = ({
  labels,
  data,
  sectionName,
  handleSave,
  isEdit,
  showNumbering,
}: NoteAccordionContentProps<NoteData>) => (
  <QuestionnaireForm
    labels={labels ?? []}
    data={data}
    sectionName={sectionName}
    handleSave={handleSave}
    isEdit={isEdit}
    showNumbering={showNumbering}
  />
)

export { QuestionnairesView }
