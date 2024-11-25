import { type SearchParams } from '@psychplus/utils/url'
import { PreferredPartnersDialogWidgetServer } from '@/widgets/preferred-partners-dialog'

const PatientReferralsListWidgetPage =  ({
  searchParams,
}: {
  searchParams: SearchParams
}) => {
  if (!searchParams.patientId) {
    return <div>Patient ID is required</div>
  }
  return <PreferredPartnersDialogWidgetServer />
}

export default PatientReferralsListWidgetPage
