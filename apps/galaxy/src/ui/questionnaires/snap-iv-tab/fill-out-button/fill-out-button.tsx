import { PropsWithChildren } from 'react'
import { useParams } from 'next/navigation'
import { QuickNoteSectionItem } from '@/types'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { FillOutButton, FillOutTabsView } from '../../shared'
import { CurrentView } from './current-view'

type FillOutButtonSnapIvProps = PropsWithChildren<{
  data: QuickNoteSectionItem[]
}>

const FillOutButtonSnapIv = ({ data }: FillOutButtonSnapIvProps) => {
  const patientId = useParams().id as string

  return (
    <FillOutButton title="Swanson, Nolan and Pelham (SNAP-IV)">
      <FillOutTabsView
        questionnaire={QuickNoteSectionName.QuickNoteSectionSnapIV}
      >
        <CurrentView patientId={patientId} data={data} />
      </FillOutTabsView>
    </FillOutButton>
  )
}

export { FillOutButtonSnapIv }
