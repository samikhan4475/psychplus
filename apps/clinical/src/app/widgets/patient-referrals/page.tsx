import type { SearchParams } from '@psychplus/types'
import { PatientReferralsWidgetServer } from '@/widgets/patient-referrals'

const PatientReferralsWidgetPage = ({
  searchParams,
}: {
  searchParams: SearchParams
}) => {
  if (!searchParams.token) {
    return <div>Token is required</div>
  }

  if (!searchParams.patientId) {
    return <div>Patient ID is required</div>
  }

  return (
    <PatientReferralsWidgetServer
      token={searchParams.token}
      patientId={searchParams.patientId}
    />
  )
}

export default PatientReferralsWidgetPage
