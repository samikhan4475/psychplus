import { PropsWithChildren } from 'react'
import { QuickNoteSectionItem } from '@/types'
import { FillOutButton, FillOutTabsView } from '../../shared'
import { CurrentView } from './current-view'

type FillOutButtonAimsProps = PropsWithChildren<{
  patientId: string
  data: QuickNoteSectionItem[]
}>

const FillOutButtonAims = ({ patientId, data }: FillOutButtonAimsProps) => {
  return (
    <FillOutButton title="Abnormal Involuntary Movement Scale (AIMS)">
      <FillOutTabsView>
        <CurrentView patientId={patientId} data={data} />
      </FillOutTabsView>
    </FillOutButton>
  )
}

export { FillOutButtonAims }
