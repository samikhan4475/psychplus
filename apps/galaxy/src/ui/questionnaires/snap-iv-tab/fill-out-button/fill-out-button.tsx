import { PropsWithChildren } from 'react'
import { QuickNoteSectionItem } from '@/types'
import { FillOutButton, FillOutTabsView } from '../../shared'
import { CurrentView } from './current-view'

type FillOutButtonSnapIvProps = PropsWithChildren<{
  patientId: string
  data: QuickNoteSectionItem[]
}>

const FillOutButtonSnapIv = ({ patientId, data }: FillOutButtonSnapIvProps) => {
  return (
    <FillOutButton title="SNAP-IV">
      <FillOutTabsView>
        <CurrentView patientId={patientId} data={data} />
      </FillOutTabsView>
    </FillOutButton>
  )
}

export { FillOutButtonSnapIv }
