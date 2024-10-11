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

type FillOutButtonPhq9Props = {
  patientId: string
}

const FillOutButtonPhq9 = ({ patientId }: FillOutButtonPhq9Props) => {
  return (
    <FillOutButton title="Patient Health Questionnaire (PHQ-9)">
      <FillOutTabsView
        patientId={patientId}
        sectionName={QuickNoteSectionName.QuickNoteSectionPhq9}
        questionnaire={QuestionnaireTabs.PHQ_9_TAB}
      >
        <QuestionnairePopupCurrentView
          data={[]}
          patientId={patientId}
          questions={QUESTIONS}
          labels={LABELS}
          scoreInterpretationRanges={SCORE_INTERPRETATION_RANGES}
          quickNoteSectionName={QuickNoteSectionName.QuickNoteSectionPhq9}
          questionnaireTab={QuestionnaireTabs.PHQ_9_TAB}
        />
      </FillOutTabsView>
    </FillOutButton>
  )
}

export { FillOutButtonPhq9 }
