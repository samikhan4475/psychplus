import { useParams } from 'next/navigation'
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

const FillOutButtonPhq9 = () => {
  const patientId = useParams().id as string
  return (
    <FillOutButton title="Patient Health Questionnaire (PHQ-9)">
      <FillOutTabsView
        questionnaire={QuickNoteSectionName.QuickNoteSectionPhq9}
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
