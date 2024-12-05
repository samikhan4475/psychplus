import { PropsWithChildren } from 'react'
import { useParams } from 'next/navigation'
import { QuickNoteSectionItem } from '@/types'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { QuestionnairesTitles } from '../../constants'
import { FillOutButton, FillOutTabsView } from '../../shared'
import { CurrentView } from './current-view'

type FillOutButtonYBocsProps = PropsWithChildren<{
  data: QuickNoteSectionItem[]
}>

const FillOutButtonYBocs = ({ data }: FillOutButtonYBocsProps) => {
  const patientId = useParams().id as string

  return (
    <FillOutButton title={QuestionnairesTitles['Y-BOCS']}>
      <FillOutTabsView
        questionnaire={QuickNoteSectionName.QuickNoteSectionYbcos}
      >
        <CurrentView patientId={patientId} data={data} />
      </FillOutTabsView>
    </FillOutButton>
  )
}

export { FillOutButtonYBocs }
