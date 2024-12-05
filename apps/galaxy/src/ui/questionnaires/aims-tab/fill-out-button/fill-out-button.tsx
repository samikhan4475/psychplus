import { PropsWithChildren } from 'react'
import { useParams } from 'next/navigation'
import { QuickNoteSectionItem } from '@/types'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { QuestionnairesTitles } from '../../constants'
import { FillOutButton, FillOutTabsView } from '../../shared'
import { CurrentView } from './current-view'

type FillOutButtonAimsProps = PropsWithChildren<{
  data: QuickNoteSectionItem[]
}>

const FillOutButtonAims = ({ data }: FillOutButtonAimsProps) => {
  const patientId = useParams().id as string

  return (
    <FillOutButton title={QuestionnairesTitles.AIMS}>
      <FillOutTabsView
        questionnaire={QuickNoteSectionName.QuickNoteSectionAims}
      >
        <CurrentView patientId={patientId} data={data} />
      </FillOutTabsView>
    </FillOutButton>
  )
}

export { FillOutButtonAims }
