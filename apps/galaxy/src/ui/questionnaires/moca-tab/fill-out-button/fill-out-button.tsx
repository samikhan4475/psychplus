import { PropsWithChildren } from 'react'
import { QuickNoteSectionItem } from '@/types'
import { FillOutButton, FillOutTabsView } from '../../shared'
import { CurrentView } from './current-view'

type FillOutButtonMocaProps = PropsWithChildren<{
  patientId: string
  data: QuickNoteSectionItem[]
}>

const FillOutButtonMoca = ({ patientId, data }: FillOutButtonMocaProps) => {
  return (
    <FillOutButton title="Montreal Cognitive Assessment (MoCA)">
      <FillOutTabsView>
        <CurrentView patientId={patientId} data={data} />
      </FillOutTabsView>
    </FillOutButton>
  )
}

export { FillOutButtonMoca }
