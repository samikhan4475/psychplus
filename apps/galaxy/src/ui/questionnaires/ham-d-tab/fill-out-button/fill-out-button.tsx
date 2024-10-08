import { PropsWithChildren } from 'react'
import { QuickNoteSectionItem } from '@/types'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { QuestionnaireTabs } from '../../constants'
import {
  FillOutButton,
  FillOutTabsView,
  QuestionnairePopupCurrentView,
} from '../../shared'
import { CLASSNAME_CELL, CLASSNAME_HEADER_CELL } from '../../shared/constants'
import { LABELS, QUESTIONS, SCORE_INTERPRETATION_RANGES } from '../constants'

type FillOutButtonHamDProps = PropsWithChildren<{
  patientId: string
  data: QuickNoteSectionItem[]
}>

const FillOutButtonHamD = ({ patientId, data }: FillOutButtonHamDProps) => {
  return (
    <FillOutButton title="Hamilton Depression Rating Scale (HAM-D)">
      <FillOutTabsView>
        <QuestionnairePopupCurrentView
          data={data}
          patientId={patientId}
          questions={QUESTIONS}
          labels={LABELS}
          scoreInterpretationRanges={SCORE_INTERPRETATION_RANGES}
          quickNoteSectionName={QuickNoteSectionName.QuickNoteSectionHamD}
          questionnaireTab={QuestionnaireTabs.HAM_D_TAB}
          classNameHeaderCell={CLASSNAME_HEADER_CELL}
          classNameCell={CLASSNAME_CELL}
        />
      </FillOutTabsView>
    </FillOutButton>
  )
}

export { FillOutButtonHamD }
