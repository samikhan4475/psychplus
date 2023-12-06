import { type SearchParams } from '@psychplus/utils/url'
import { PatientInformationWidgetServer } from '@/widgets/patient-information'

const PatientInformationWidgetPage = ({
  searchParams,
}: {
  searchParams: SearchParams
}) => {
  if (!searchParams.patientId) {
    return <div>Patient ID is required</div>
  }

  return <PatientInformationWidgetServer patientId={searchParams.patientId} />
}

export default PatientInformationWidgetPage
