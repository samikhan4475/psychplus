import { PropsWithChildren } from 'react'
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
  patientId: string
  data: QuickNoteSectionItem[]
}>

const FillOutButtonGad7 = ({ patientId, data }: FillOutButtonGad7Props) => {
  return (
    <FillOutButton title="Generalized Anxiety Disorder (GAD-7)">
      <FillOutTabsView
        patientId={patientId}
        sectionName={QuickNoteSectionName.QuickNoteSectionGad7}
        questionnaire={QuestionnaireTabs.GAD_7_TAB}
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
