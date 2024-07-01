import { type SearchParams } from '@psychplus/utils/url'
import { PatientInformationWidgetServer } from '@/widgets/patient-information'
import { Text } from '@radix-ui/themes'

const PatientInformationWidgetPage = ({
  searchParams,
}: {
  searchParams: SearchParams
}) => {
  if (!searchParams.patientId) {
    return <Text>Patient ID is required</Text>
  }

  return (
    <PatientInformationWidgetServer
      patientId={Number(searchParams.patientId)}
    />
  )
}

export default PatientInformationWidgetPage
