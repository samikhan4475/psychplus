import React from 'react'
import { useParams, useSearchParams } from 'next/navigation'
import { Flex } from '@radix-ui/themes'
import { FormProvider } from 'react-hook-form'
import { WidgetFormContainer } from '@/components'
import { QuickNoteSectionItem } from '@/types'
import {
  CLASSNAME_CELL,
  CLASSNAME_HEADER_CELL,
} from '@/ui/questionnaires/shared/constants'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { FilloutCurrentTab } from '.'
import { transformIn, transformOut } from '../data'
import { QuestionnairesForm } from '../questionnaires-form'
import { useQuestionnaireForm } from '../use-questionnaire-form'
import { META_INFO } from './constants'

type FilloutCommonProps = React.PropsWithChildren<{
  data: QuickNoteSectionItem[]
  sectionName: QuickNoteSectionName
}>

const FilloutCommon = ({ data, sectionName }: FilloutCommonProps) => {
  const patientId = useParams().id as string
  const appointmentId = useSearchParams().get('id') as string

  const { questions, labels, scoreInterpretationRanges } =
    META_INFO[sectionName as keyof typeof META_INFO] || {}

  const totalQuestions = questions.length
  const initialValue = transformIn(data, totalQuestions)
  const { totalScore, totalFilledQuestions, ...form } = useQuestionnaireForm(
    initialValue,
    totalQuestions,
  )

  if (!questions || !labels || !scoreInterpretationRanges) {
    return null
  }
  return (
    <FormProvider {...form}>
      <Flex direction="column" gap=".5rem">
        <WidgetFormContainer
          patientId={patientId}
          tags={[sectionName]}
          widgetId={sectionName}
          getData={transformOut(patientId, sectionName, appointmentId)}
        >
          <FilloutCurrentTab
            max={Object.keys(initialValue).length}
            value={totalFilledQuestions}
          >
            <QuestionnairesForm
              data={questions}
              labels={labels}
              totalScore={totalScore}
              scoreInterpretationRanges={scoreInterpretationRanges}
              classNameHeaderCell={CLASSNAME_HEADER_CELL}
              classNameCell={CLASSNAME_CELL}
            />
          </FilloutCurrentTab>
        </WidgetFormContainer>
      </Flex>
    </FormProvider>
  )
}

export { FilloutCommon }
