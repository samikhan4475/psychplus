import { type SearchParams } from '@psychplus/utils/url'
import { PreferredPartnerDetailsWidgetServer } from '@/widgets/preferred-partner-details'

const PatientReferralsListWidgetPage = ({
  searchParams,
}: {
  searchParams: SearchParams
}) => {
  if (!searchParams.id) {
    return <div>Patient ID is required</div>
  }
  return (
    <PreferredPartnerDetailsWidgetServer patientId={searchParams.id}/>
  )
}

export default PatientReferralsListWidgetPage
