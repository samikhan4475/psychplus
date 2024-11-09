import { PropsWithChildren } from 'react'
import { useParams } from 'next/navigation'
import { QuickNoteSectionItem } from '@/types'
import {
  LABELS,
  SCORE_INTERPRETATION_RANGES,
} from '@/ui/questionnaires/shared/constants'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { QuestionnaireTabs } from '../constants'
import {
  FillOutButton,
  FillOutTabsView,
  QuestionnairePopupCurrentView,
} from '../shared'
import { QUESTIONS } from './constants'

type FillOutButtonGad7Props = PropsWithChildren<{
  data: QuickNoteSectionItem[]
}>

const FillOutButtonGad7 = ({ data }: FillOutButtonGad7Props) => {
  const patientId = useParams().id as string

  return (
    <FillOutButton title="Generalized Anxiety Disorder (GAD-7)">
      <FillOutTabsView
        questionnaire={QuickNoteSectionName.QuickNoteSectionGad7}
      >
        <QuestionnairePopupCurrentView
          data={data}
          patientId={patientId}
          questions={QUESTIONS}
          labels={LABELS}
          scoreInterpretationRanges={SCORE_INTERPRETATION_RANGES}
          quickNoteSectionName={QuickNoteSectionName.QuickNoteSectionGad7}
          questionnaireTab={QuestionnaireTabs.GAD_7_TAB}
        />
      </FillOutTabsView>
    </FillOutButton>
  )
}

export { FillOutButtonGad7 }
