'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import { Text } from '@radix-ui/themes'
import { FormProvider } from 'react-hook-form'
import { BookingConfirmedIcon, NoteFormContainer } from '@/components-v2'
import { AppointmentHeader } from '@/events/appointments/confirmations/ui/appointment-header'
import { BackToHomeButton } from '@/events/appointments/confirmations/ui/buttons'
import { NoteSectionName } from '@/features/note/constants'
import { NoteSectionItem } from '@/features/note/types'
import { sectionComponents } from '@/features/pre-checkin-assessment/ui/steps/questionnaire'
import {
  getQuestionnaireMapping,
  getTotalQuestions,
  transformIn,
  transformOut,
  useQuestionnaireForm,
} from '@/features/questionnaire'

interface PatientsQuestionnairesSectionProps {
  questionnaireData: NoteSectionItem[]
  questionnaireSection: NoteSectionName
}

const PatientsQuestionnairesSection = ({
  questionnaireData,
  questionnaireSection,
}: PatientsQuestionnairesSectionProps) => {
  const { id, type } = useParams<{ id: string; type: string }>()
  const [isFilled, setIsFilled] = useState(false)
  const initialValue = transformIn(
    questionnaireData,
    questionnaireSection,
    getQuestionnaireMapping(questionnaireSection),
  )
  const totalQuestions = getTotalQuestions(questionnaireSection)
  const { totalFilledQuestions, ...form } = useQuestionnaireForm(
    initialValue,
    totalQuestions as number,
  )
  const questionnaireSectionToShow = sectionComponents.find(
    (section) => section.name === questionnaireSection,
  )
  if (!questionnaireSectionToShow) return
  const { title, component: Component } = questionnaireSectionToShow

  const handleSave = async () => {
    setIsFilled(true)
  }

  return (
    <>
      {!isFilled ? (
        <FormProvider {...form}>
          <NoteFormContainer
            getData={transformOut(
              id,
              questionnaireSection as NoteSectionName,
              true,
            )}
            isEdit={true}
            isUnauthenticated={true}
            onSave={handleSave}
            noteType={type}
            patientId={id}
          >
            <Text size="6" className="font-[600]">
              {title}
            </Text>
            <Component />
          </NoteFormContainer>
        </FormProvider>
      ) : (
        <>
          <AppointmentHeader
            icon={<BookingConfirmedIcon />}
            title="Your Questionnaire is Saved!"
          />
          <BackToHomeButton />
        </>
      )}
    </>
  )
}

export { PatientsQuestionnairesSection }
