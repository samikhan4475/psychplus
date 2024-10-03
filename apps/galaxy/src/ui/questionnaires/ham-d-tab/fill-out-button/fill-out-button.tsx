import { PropsWithChildren } from 'react'
import { QuickNoteSectionItem } from '@/types'
import { FillOutButton, FillOutTabsView } from '../../shared'
import { CurrentView } from './current-view'

type FillOutButtonHamDProps = PropsWithChildren<{
  patientId: string
  data: QuickNoteSectionItem[]
}>

const FillOutButtonHamD = ({ patientId, data }: FillOutButtonHamDProps) => {
  return (
    <FillOutButton title="HAM-D">
      <FillOutTabsView>
        <CurrentView patientId={patientId} data={data} />
      </FillOutTabsView>
    </FillOutButton>
  )
}

export { FillOutButtonHamD }
