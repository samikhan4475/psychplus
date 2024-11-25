import { type SearchParams } from '@psychplus/utils/url'
import { PreferredPartnersListWidgetServer } from '@/widgets/preferred-partners-list'

const PatientReferralsListWidgetPage = ({
  searchParams,
}: {
  searchParams: SearchParams
}) => {
  if (!searchParams.patientId) {
    return <div>Patient ID is required</div>
  }
  return <PreferredPartnersListWidgetServer />
}

export default PatientReferralsListWidgetPage
