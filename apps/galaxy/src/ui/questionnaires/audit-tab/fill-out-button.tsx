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

type FillOutButtonAuditProps = PropsWithChildren<{
  data: QuickNoteSectionItem[]
}>

const FillOutButtonAudit = ({ data }: FillOutButtonAuditProps) => {
  const patientId = useParams().id as string

  return (
    <FillOutButton title={QuestionnairesTitles.AUDIT}>
      <FillOutTabsView
        questionnaire={QuickNoteSectionName.QuickNoteSectionAudit}
      >
        <QuestionnairePopupCurrentView
          data={data}
          patientId={patientId}
          questions={QUESTIONS}
          labels={LABELS}
          scoreInterpretationRanges={SCORE_INTERPRETATION_RANGES}
          quickNoteSectionName={QuickNoteSectionName.QuickNoteSectionAudit}
          questionnaireTab={QuestionnaireTabs.AUDIT_TAB}
          classNameHeaderCell={CLASSNAME_HEADER_CELL}
          classNameCell={CLASSNAME_CELL}
        />
      </FillOutTabsView>
    </FillOutButton>
  )
}

export { FillOutButtonAudit }
