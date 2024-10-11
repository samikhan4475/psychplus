import { PropsWithChildren } from 'react'
import { QuickNoteSectionItem } from '@/types'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { QuestionnaireTabs } from '../../constants'
import { FillOutButton, FillOutTabsView } from '../../shared'
import { CurrentView } from './current-view'

type FillOutButtonSnapIvProps = PropsWithChildren<{
  patientId: string
  data: QuickNoteSectionItem[]
}>

const FillOutButtonSnapIv = ({ patientId, data }: FillOutButtonSnapIvProps) => {
  return (
    <FillOutButton title="Swanson, Nolan and Pelham (SNAP-IV)">
      <FillOutTabsView
        patientId={patientId}
        sectionName={QuickNoteSectionName.QuickNoteSectionSnapIV}
        questionnaire={QuestionnaireTabs.SNAP_IV_TAB}
      >
        <CurrentView patientId={patientId} data={data} />
      </FillOutTabsView>
    </FillOutButton>
  )
}

export { FillOutButtonSnapIv }
