import { Text } from '@radix-ui/themes'
import { getPatientAllergiesAction } from '@/ui/allergy/patient-allergies-widget/actions'
import { Details } from './details'

interface AllergiesDetailsViewProps {
  patientId: string
}
const AllergiesDetailsView = async ({
  patientId,
}: AllergiesDetailsViewProps) => {
  const payload = {
    patientIds: [patientId],
  }
  const response = await getPatientAllergiesAction({
    payload,
  })

  if (response.state === 'error') {
    return <Text>{response.error}</Text>
  }

  return <Details data={response.data} />
}

export { AllergiesDetailsView }
