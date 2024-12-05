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
import { LABELS, QUESTIONS, SCORE_INTERPRETATION_RANGES } from './constants'

type FillOutButtonPcl5Props = PropsWithChildren<{
  data: QuickNoteSectionItem[]
}>

const FillOutButtonPcl5 = ({ data }: FillOutButtonPcl5Props) => {
  const patientId = useParams().id as string

  return (
    <FillOutButton title={QuestionnairesTitles['PCL-5']}>
      <FillOutTabsView
        questionnaire={QuickNoteSectionName.QuickNoteSectionPcl5}
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
