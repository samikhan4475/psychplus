import { PropsWithChildren } from 'react'
import { QuickNoteSectionItem } from '@/types'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { QuestionnaireTabs } from '../constants'
import {
  FillOutButton,
  FillOutTabsView,
  QuestionnairePopupCurrentView,
} from '../shared'
import { CLASSNAME_CELL, CLASSNAME_HEADER_CELL } from '../shared/constants'
import { LABELS, QUESTIONS, SCORE_INTERPRETATION_RANGES } from './constants'

type FillOutButtonDast10Props = PropsWithChildren<{
  patientId: string
  data: QuickNoteSectionItem[]
}>

const FillOutButtonDast10 = ({ patientId, data }: FillOutButtonDast10Props) => {
  return (
    <FillOutButton title="Drug Abuse Screening Test (DAST-10)">
      <FillOutTabsView
        patientId={patientId}
        sectionName={QuickNoteSectionName.QuickNoteSectionDast10}
        questionnaire={QuestionnaireTabs.DAST_10_TAB}
      >
        <QuestionnairePopupCurrentView
          data={data}
          patientId={patientId}
          questions={QUESTIONS}
          labels={LABELS}
          scoreInterpretationRanges={SCORE_INTERPRETATION_RANGES}
          quickNoteSectionName={QuickNoteSectionName.QuickNoteSectionDast10}
          questionnaireTab={QuestionnaireTabs.DAST_10_TAB}
          classNameHeaderCell={CLASSNAME_HEADER_CELL}
          classNameCell={CLASSNAME_CELL}
        />
      </FillOutTabsView>
    </FillOutButton>
  )
}

export { FillOutButtonDast10 }
