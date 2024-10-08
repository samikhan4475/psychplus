import { PropsWithChildren } from 'react'
import { QuickNoteSectionItem } from '@/types'
import { FillOutButton, FillOutTabsView } from '../../shared'
import { CurrentView } from './current-view'

type FillOutButtonYBocsProps = PropsWithChildren<{
  patientId: string
  data: QuickNoteSectionItem[]
}>

const FillOutButtonYBocs = ({ patientId, data }: FillOutButtonYBocsProps) => {
  return (
    <FillOutButton title="Yale-Brown Obsessive Compulsive (Y-BOCS)">
      <FillOutTabsView>
        <CurrentView patientId={patientId} data={data} />
      </FillOutTabsView>
    </FillOutButton>
  )
}

export { FillOutButtonYBocs }
