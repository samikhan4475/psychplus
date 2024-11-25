import { type SearchParams } from '@psychplus/utils/url'
import {
  AllReferralsListWidget,
  CreateReferralWidget,
  EditReferralWidget,
  ReferralDetailsWidget,
} from '@psychplus/widgets/clinical'
import { PageHeader } from '../../shared/page-header'
import { Client } from './client'

const TITLE = 'All Referrals Widget'
const DESCRIPTION = 'A table displaying all referrals.'

const PatientReferralsListWidgetPage = ({
  searchParams,
}: {
  searchParams: SearchParams
}) => {
  if (!searchParams.patientId) {
    return <div>Patient ID is required</div>
  }
  return (
    <>
      <Client />
      <PageHeader title={TITLE} description={DESCRIPTION} />
      <CreateReferralWidget patientId={1279} />
      <EditReferralWidget />
      <ReferralDetailsWidget />
      <AllReferralsListWidget title="Referrals" includeInactive />
    </>
  )
}

export default PatientReferralsListWidgetPage
