import { PropsWithChildren } from 'react'
import { QuickNoteSectionItem } from '@/types'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { QuestionnaireTabs } from '../constants'
import {
  FillOutButton,
  FillOutTabsView,
  QuestionnairePopupCurrentView,
} from '../shared'
import { LABELS, QUESTIONS, SCORE_INTERPRETATION_RANGES } from './constants'

type FillOutButtonPcl5Props = PropsWithChildren<{
  patientId: string
  data: QuickNoteSectionItem[]
}>

const FillOutButtonPcl5 = ({ patientId, data }: FillOutButtonPcl5Props) => {
  return (
    <FillOutButton title="Posttraumatic Stress Disorder Checklist (PCL-5)">
      <FillOutTabsView
        patientId={patientId}
        sectionName={QuickNoteSectionName.QuickNoteSectionPcl5}
        questionnaire={QuestionnaireTabs.PCL_5_TAB}
      >
        <QuestionnairePopupCurrentView
          data={data}
          patientId={patientId}
          questions={QUESTIONS}
          labels={LABELS}
          scoreInterpretationRanges={SCORE_INTERPRETATION_RANGES}
          quickNoteSectionName={QuickNoteSectionName.QuickNoteSectionPcl5}
          questionnaireTab={QuestionnaireTabs.PCL_5_TAB}
        />
      </FillOutTabsView>
    </FillOutButton>
  )
}

export { FillOutButtonPcl5 }
