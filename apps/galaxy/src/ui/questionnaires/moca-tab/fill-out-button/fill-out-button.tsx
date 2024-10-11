import { PropsWithChildren } from 'react'
import { QuickNoteSectionItem } from '@/types'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { QuestionnaireTabs } from '../../constants'
import { FillOutButton, FillOutTabsView } from '../../shared'
import { CurrentView } from './current-view'

type FillOutButtonMocaProps = PropsWithChildren<{
  patientId: string
  data: QuickNoteSectionItem[]
}>

const FillOutButtonMoca = ({ patientId, data }: FillOutButtonMocaProps) => {
  return (
    <FillOutButton title="Montreal Cognitive Assessment (MoCA)">
      <FillOutTabsView
        patientId={patientId}
        sectionName={QuickNoteSectionName.QuickNoteSectionMoca}
        questionnaire={QuestionnaireTabs.MOCA_TAB}
      >
        <CurrentView patientId={patientId} data={data} />
      </FillOutTabsView>
    </FillOutButton>
  )
}

export { FillOutButtonMoca }
