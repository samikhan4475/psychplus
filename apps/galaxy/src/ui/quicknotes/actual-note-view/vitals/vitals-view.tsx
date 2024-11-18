import { Text } from '@radix-ui/themes'
import { getQuickNoteDetailAction } from '@/actions/get-quicknote-detail'
import { transformIn } from '@/ui/vitals/data'
import { getPatientVitalsAction } from '@/ui/vitals/vitals-widget/actions'
import { QuickNoteSectionName } from '../../constants'
import { ActualNoteDetailsWrapper } from '../shared'
import { Details } from './details'

type VitalsProps = {
  patientId: string
  appointmentId: string
}

const VitalsView = async ({ patientId, appointmentId }: VitalsProps) => {
  const response = await getQuickNoteDetailAction(
    patientId,
    [QuickNoteSectionName.Vitals],
    appointmentId,
  )

  if (response.state === 'error') {
    return <Text>{response.error}</Text>
  }

  const vitalsIds = transformIn(response.data).vitalsId

  const result = await getPatientVitalsAction({
    payload: {
      appointmentId: Number(appointmentId),
      patientId: patientId,
      vitalIds: vitalsIds.map(Number),
    },
  })

  if (result.state === 'error') {
    return <Text>{result.error}</Text>
  }

  return (
    <ActualNoteDetailsWrapper
      sectionName={QuickNoteSectionName.QuickNoteSectionPastMedicalHx}
    >
      <Details data={result?.data} />
    </ActualNoteDetailsWrapper>
  )
}

export { VitalsView }
