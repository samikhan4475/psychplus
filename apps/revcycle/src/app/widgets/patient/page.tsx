import { type SearchParams } from '@psychplus/utils/url'
import { PatientWidgetServer } from '@/widgets/patient'

const PatientWidgetPage = ({
  searchParams,
}: {
  searchParams: SearchParams
}) => {
  if (!searchParams.patientId) {
    return <div>Patient ID is required</div>
  }

  return <PatientWidgetServer patientId={searchParams.patientId} />
}

export default PatientWidgetPage
