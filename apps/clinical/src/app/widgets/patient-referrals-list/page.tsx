import { type SearchParams } from '@psychplus/utils/url'
import { PatientReferralsListWidgetServer } from '@/widgets/patient-referrals-list'

const PatientReferralsListWidgetPage = ({
  searchParams,
}: {
  searchParams: SearchParams
}) => {
  if (!searchParams.patientId) {
    return <div>Patient ID is required</div>
  }

  return (
    <PatientReferralsListWidgetServer
      patientId={Number(searchParams.patientId)}
    />
  )
}

export default PatientReferralsListWidgetPage
