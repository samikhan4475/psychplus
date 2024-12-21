import { Text } from '@radix-ui/themes'
import { getPatientMedicationsAction } from '@/ui/medications/patient-medications-widget/actions'
import { Details } from './details'

interface MedicationsDetailsViewProps {
  patientId: string
}
const MedicationsDetailsView = async ({
  patientId,
}: MedicationsDetailsViewProps) => {
  const response = await getPatientMedicationsAction({
    patientIds: [patientId],
  })

  if (response.state === 'error') {
    return <Text>{response.error}</Text>
  }

  return <Details data={response.data.medications} />
}

export { MedicationsDetailsView }
