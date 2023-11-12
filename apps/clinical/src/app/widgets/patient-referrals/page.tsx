import { withAPI } from '@psychplus/ui/with-api'
import { type SearchParams } from '@psychplus/utils/url'
import { PatientReferralsWidgetServer } from '@/widgets/patient-referrals'

const PatientReferralsWidgetPage = ({
  searchParams,
}: {
  searchParams: SearchParams
}) => {
  if (!searchParams.patientId) {
    return <div>Patient ID is required</div>
  }

  return <PatientReferralsWidgetServer patientId={searchParams.patientId} />
}

export default withAPI(PatientReferralsWidgetPage)
