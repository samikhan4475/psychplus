import { type SearchParams } from '@psychplus/utils/url'
import { PatientRelationshipWidgetServer } from '@/widgets/patient-relationship'
import { Text } from '@radix-ui/themes'

const PatientRelationshipWidgetPage = ({
  searchParams,
}: {
  searchParams: SearchParams
}) => {
  if (!searchParams.patientId) {
    return <Text>Patient ID is required</Text>
  }

  return (
    <PatientRelationshipWidgetServer patientId={Number(searchParams.patientId)} />
  )
}

export default PatientRelationshipWidgetPage
