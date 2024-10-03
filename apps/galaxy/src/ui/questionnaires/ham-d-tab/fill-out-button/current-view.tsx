import { Flex } from '@radix-ui/themes'
import { FormProvider } from 'react-hook-form'
import { WidgetFormContainer } from '@/components'
import { QuickNoteSectionItem } from '@/types'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import {
  FilloutCurrentTab,
  QuestionnairesForm,
  useQuestionnaireForm,
} from '../../shared'
import { transformIn, transformOut } from '../../shared/data'
import { LABELS, QUESTIONS, SCORE_INTERPRETATION_RANGES } from '../constants'

type FilloutCurrentView = React.PropsWithChildren<{
  patientId: string
  data: QuickNoteSectionItem[]
}>

const CurrentView = ({ patientId, data }: FilloutCurrentView) => {
  const totalQuestions = QUESTIONS.length
  const initialValue = transformIn(data, totalQuestions)
  const { totalScore, ...form } = useQuestionnaireForm(
    initialValue,
    totalQuestions,
  )

  return (
    <FormProvider {...form}>
      <Flex direction="column" gap=".5rem">
        <WidgetFormContainer
          title=""
          enableEvents={false}
          patientId={patientId}
          widgetId="ham-d popup"
          getData={transformOut(
            patientId,
            QuickNoteSectionName.QuickNoteSectionHamD,
          )}
        >
          <FilloutCurrentTab max={Object.keys(initialValue).length} value={7}>
            <QuestionnairesForm
              data={QUESTIONS}
              labels={LABELS}
              totalScore={totalScore}
              scoreInterpretationRanges={SCORE_INTERPRETATION_RANGES}
              classNameHeaderCell="bg-pp-focus-bg align-middle border-pp-table-border h-5 border px-[50px] py-0"
              classNameCell="align-middle border-pp-table-border h-5 border pl-[10px] py-0.5"
            />
          </FilloutCurrentTab>
        </WidgetFormContainer>
      </Flex>
    </FormProvider>
  )
}

export { CurrentView }
