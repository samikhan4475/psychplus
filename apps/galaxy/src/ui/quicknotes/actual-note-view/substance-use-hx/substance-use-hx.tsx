import { Text } from '@radix-ui/themes'
import { getQuickNoteDetailAction } from '@/actions/get-quicknote-detail'
import { PatientProfile } from '@/types'
import { transformIn } from '@/ui/substance-use-hx/substance-use-hx-widget/data'
import { QuickNoteSectionName } from '../../constants'
import { ActualNoteDetailsWrapper } from '../shared'
import { Details } from './details'

interface SubstanceUseHxProps {
  patientId: string
  appointmentId: string
  patient?: PatientProfile
}

const SubstanceUseHx = async ({ patientId, patient }: SubstanceUseHxProps) => {
  const response = await getQuickNoteDetailAction(patientId, [
    QuickNoteSectionName.QuickNoteSectionSubstanceUseHx,
  ])

  if (response.state === 'error') {
    return <Text>{response.error}</Text>
  }

  return (
    <ActualNoteDetailsWrapper
      sectionName={QuickNoteSectionName.QuickNoteSectionSubstanceUseHx}
    >
      <Details
        sectionName="Substance Use History"
        data={transformIn(response.data)}
        patient={patient}
      />
    </ActualNoteDetailsWrapper>
  )
}

export { SubstanceUseHx }
