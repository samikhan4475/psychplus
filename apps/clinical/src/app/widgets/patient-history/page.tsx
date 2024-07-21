import { type SearchParams } from '@psychplus/utils/url'
import { PatientHistoryWidgetServer } from '@/widgets/patient-history'
import { Text } from '@radix-ui/themes'

const PatientHistoryWidgetPage = ({
  searchParams,
}: {
  searchParams: SearchParams
}) => {
  if (!searchParams.patientId) {
    return <Text>Patient ID is required</Text>
  }

  return (
    <PatientHistoryWidgetServer
      patientId={Number(searchParams.patientId)}
    />
  )
}

export default PatientHistoryWidgetPage
