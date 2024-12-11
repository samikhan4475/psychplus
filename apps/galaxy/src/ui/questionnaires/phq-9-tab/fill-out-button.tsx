import { useParams } from 'next/navigation'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { QuestionnairesTitles } from '../constants'
import {
  FillOutButton,
  FillOutTabsView,
  QuestionnairePopupCurrentView,
} from '../shared'
import { LABELS, QUESTIONS, SCORE_INTERPRETATION_RANGES } from './constants'

const FillOutButtonPhq9 = () => {
  const patientId = useParams().id as string
  return (
    <FillOutButton title={QuestionnairesTitles['PHQ-9']}>
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
        />
      </FillOutTabsView>
    </FillOutButton>
  )
}

export { FillOutButtonPhq9 }
