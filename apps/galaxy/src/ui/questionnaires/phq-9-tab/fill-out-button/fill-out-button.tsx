import { PropsWithChildren } from 'react'
import { FillOutButton, FillOutTabsView } from '../../shared'
import { CurrentView } from './current-view'

type FillOutButtonPhq9Props = PropsWithChildren<{
  patientId: string
}>

const FillOutButtonPhq9 = ({ patientId }: FillOutButtonPhq9Props) => {
  return (
    <FillOutButton title="Patient Health Questionnaire (PHQ-9)">
      <FillOutTabsView>
        <CurrentView patientId={patientId} />
      </FillOutTabsView>
    </FillOutButton>
  )
}

export { FillOutButtonPhq9 }
