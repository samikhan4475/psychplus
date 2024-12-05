import { PropsWithChildren } from 'react'
import { useParams } from 'next/navigation'
import { QuickNoteSectionItem } from '@/types'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { QuestionnairesTitles, QuestionnaireTabs } from '../constants'
import {
  FillOutButton,
  FillOutTabsView,
  QuestionnairePopupCurrentView,
} from '../shared'
import { CLASSNAME_CELL, CLASSNAME_HEADER_CELL } from '../shared/constants'
import { LABELS, QUESTIONS, SCORE_INTERPRETATION_RANGES } from './constants'

type FillOutButtonHamDProps = PropsWithChildren<{
  data: QuickNoteSectionItem[]
}>

const FillOutButtonHamD = ({ data }: FillOutButtonHamDProps) => {
  const patientId = useParams().id as string

  return (
    <FillOutButton title={QuestionnairesTitles['HAM-D']}>
      <FillOutTabsView
        questionnaire={QuickNoteSectionName.QuickNoteSectionHamD}
      >
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
