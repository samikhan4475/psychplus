import { PropsWithChildren } from 'react'
import { useParams } from 'next/navigation'
import { QuickNoteSectionItem } from '@/types'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { QuestionnairesTitles } from '../../constants'
import { FillOutButton, FillOutTabsView } from '../../shared'
import { CurrentView } from './current-view'

type FillOutButtonMocaProps = PropsWithChildren<{
  data: QuickNoteSectionItem[]
}>

const FillOutButtonMoca = ({ data }: FillOutButtonMocaProps) => {
  const patientId = useParams().id as string

  return (
    <FillOutButton title={QuestionnairesTitles.MOCA}>
      <FillOutTabsView
        questionnaire={QuickNoteSectionName.QuickNoteSectionMoca}
      >
        <CurrentView patientId={patientId} data={data} />
      </FillOutTabsView>
    </FillOutButton>
  )
}

export { FillOutButtonMoca }
