'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { parseDate, type DateValue } from '@internationalized/date'
import { Flex, Text } from '@radix-ui/themes'
import { FormProvider } from 'react-hook-form'
import { getPatientProfileAction } from '@/actions'
import { ViewLoadingPlaceholder, WidgetFormContainer } from '@/components'
import { QuickNoteSectionItem } from '@/types'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { getAgeFromDate } from '@/utils'
import { QuestionnaireTabs } from '../constants'
import {
  HistoryButton,
  QuestionnairesForm,
  SaveButton,
  useQuestionnaireForm,
} from '../shared'
import { transformIn, transformOut } from '../shared/data'
import {
  LABELS,
  QUESTIONS,
  SCORE_INTERPRETATION_RANGES,
  SCORE_INTERPRETATION_RANGES_AGE_12,
} from './constants'

const Cars2StTab = ({
  patientId,
  data,
}: {
  patientId: string
  data: QuickNoteSectionItem[]
}) => {
  const [patientLoading, setPatientLoading] = useState(true)
  const [patientAge, setPatientAge] = useState<number | null>()
  const appointmentId = useSearchParams().get('id') as string
  const totalQuestions = QUESTIONS.length
  const initialValue = transformIn(
    data,
    totalQuestions,
    QuickNoteSectionName.QuickNoteSectionCars2St,
    1,
  )
  const { totalScore, ...form } = useQuestionnaireForm(
    initialValue,
    totalQuestions,
  )

  useEffect(() => {
    ;(async () => {
      const response = await getPatientProfileAction(patientId)
      if (response.state === 'success' && response.data.birthdate) {
        const birthdate: DateValue = parseDate(response.data.birthdate)
        setPatientAge(getAgeFromDate(birthdate))
      }
      setPatientLoading(false)
    })()
  }, [patientId])

  if (!data || patientLoading) {
    return <ViewLoadingPlaceholder title={QuestionnaireTabs.CARS_2_ST_TAB} />
  }

  return (
    <FormProvider {...form}>
      <Flex direction="column" gap=".5rem">
        <WidgetFormContainer
          patientId={patientId}
          tags={[QuickNoteSectionName.QuickNoteSectionCars2St]}
          widgetId={QuickNoteSectionName.QuickNoteSectionCars2St}
          getData={transformOut(
            patientId,
            QuickNoteSectionName.QuickNoteSectionCars2St,
            appointmentId,
          )}
          title={QuestionnaireTabs.CARS_2_ST_TAB}
          headerRight={
            <Flex gap="2">
              <HistoryButton
                questionnaire={QuickNoteSectionName.QuickNoteSectionCars2St}
              />
              <SaveButton />
            </Flex>
          }
        />
        <Flex className="bg-white px-3 py-1">
          <Text className="text-1">
            In CARS-2 (Childhood Autism Rating Scale) screen, patients/parents
            are presented with questions designed to assess the severity of
            autism spectrum disorder in them.
          </Text>
        </Flex>
        <Flex maxWidth="100%" className="bg-white" px="3" py="1">
          <QuestionnairesForm
            data={QUESTIONS}
            labels={LABELS}
            totalScore={totalScore}
            scoreInterpretationRanges={
              patientAge && patientAge <= 12
                ? SCORE_INTERPRETATION_RANGES_AGE_12
                : SCORE_INTERPRETATION_RANGES
            }
            classNameHeaderCell="bg-pp-focus-bg align-middle border-pp-table-border "
          />
        </Flex>
      </Flex>
    </FormProvider>
  )
}

export { Cars2StTab }
