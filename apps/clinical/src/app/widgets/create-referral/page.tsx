import { type SearchParams } from '@psychplus/utils/url'
import { CreateReferralWidgetServer } from '@/widgets/create-referral'

const CreateReferralWidgetPage = ({
  searchParams,
}: {
  searchParams: SearchParams
}) => {
  const patientId = searchParams.patientId

  if (!patientId) {
    return <div>Patient ID is required</div>
  }

  return <CreateReferralWidgetServer patientId={Number(patientId)} />
}

export default CreateReferralWidgetPage
