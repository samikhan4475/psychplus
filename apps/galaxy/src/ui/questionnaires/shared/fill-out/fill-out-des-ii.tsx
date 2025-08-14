import { useParams, useSearchParams } from 'next/navigation'
import { Flex } from '@radix-ui/themes'
import { FormProvider } from 'react-hook-form'
import { WidgetFormContainer } from '@/components'
import { QuickNoteSectionItem } from '@/types'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import {
  LABELS,
  QUESTIONS,
  SCORE_INTERPRETATION_RANGES,
} from '../../des-ii-tab/constants'
import { CLASSNAME_HEADER_CELL } from '../constants'
import { transformIn, transformOut } from '../data'
import { QuestionnairesForm } from '../questionnaires-form'
import { useQuestionnaireForm } from '../use-questionnaire-form'
import { calculateDesiiScore } from '../utils/score-calculator'
import { FilloutCurrentTab } from './fill-out-current-tab'

type FilloutGqAscProps = React.PropsWithChildren<{
  sectionName: QuickNoteSectionName
  data: QuickNoteSectionItem[]
}>

const FilloutDesii = ({ sectionName, data }: FilloutGqAscProps) => {
  const totalQuestions = QUESTIONS.length
  const initialValue = transformIn(
    data,
    totalQuestions,
    QuickNoteSectionName.QuickNoteSectionDesii,
  )
  const { totalScore, totalFilledQuestions, ...form } = useQuestionnaireForm(
    initialValue,
    totalQuestions,
    calculateDesiiScore,
  )

  const appointmentId = useSearchParams().get('id') as string
  const patientId = useParams().id as string

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
            widgetId={sectionName}
          >
            <Flex maxWidth="100%" className="bg-white" px="3" py="1">
              <QuestionnairesForm
                data={QUESTIONS}
                labels={LABELS}
                totalScore={totalScore}
                scoreInterpretationRanges={SCORE_INTERPRETATION_RANGES}
                classNameHeaderCell={CLASSNAME_HEADER_CELL}
                classNameHeader="bg-pp-focus-bg align-middle"
              />
            </Flex>
          </FilloutCurrentTab>
        </WidgetFormContainer>
      </Flex>
    </FormProvider>
  )
}

export { FilloutDesii }
