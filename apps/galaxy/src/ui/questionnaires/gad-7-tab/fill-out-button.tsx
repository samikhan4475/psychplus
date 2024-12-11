import { PropsWithChildren } from 'react'
import { useParams } from 'next/navigation'
import { QuickNoteSectionItem } from '@/types'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { QuestionnairesTitles } from '../constants'
import {
  FillOutButton,
  FillOutTabsView,
  QuestionnairePopupCurrentView,
} from '../shared'
import { LABELS, QUESTIONS, SCORE_INTERPRETATION_RANGES } from './constants'

type FillOutButtonGad7Props = PropsWithChildren<{
  data: QuickNoteSectionItem[]
}>

const FillOutButtonGad7 = ({ data }: FillOutButtonGad7Props) => {
  const patientId = useParams().id as string

  return (
    <FillOutButton title={QuestionnairesTitles['GAD-7']}>
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
        />
      </FillOutTabsView>
    </FillOutButton>
  )
}

export { FillOutButtonGad7 }
