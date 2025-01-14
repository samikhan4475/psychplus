import { Text } from '@radix-ui/themes'
import { getFeatureFlagsAction } from '@/actions/get-feature-flag'
import { APP_ENV } from '@/constants'
import { PatientAllergiesView } from '@/ui/allergy'

interface PatientAllergiesPageProps {
  params: {
    id: string
  }
}

const PatientAllergiesPage = async ({ params }: PatientAllergiesPageProps) => {
  const result = await getFeatureFlagsAction({
    recordStatuses: ['Active'],
    exactShortName: 'ehr8973EnableDawMedicationApi',
    environmentCodes: [APP_ENV],
  })

  if (result.state === 'error') {
    return <Text>{result.error}</Text>
  }

  return (
    <PatientAllergiesView
      patientId={params.id}
      isPatientAllergiesTab={true}
      featureFlags={result.data}
    />
  )
}

export default PatientAllergiesPage
