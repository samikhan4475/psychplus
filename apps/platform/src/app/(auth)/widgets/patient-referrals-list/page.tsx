import {
  CreateReferralWidget,
  EditReferralWidget,
  PatientReferralsListWidget,
  ReferralDetailsWidget,
} from '@psychplus/widgets/clinical'
import { PageHeader } from '../../shared/page-header'
import { Client } from './client'

const TITLE = 'Patient Referrals Widget'
const DESCRIPTION = 'A table displaying patient referrals.'

const PatientReferralsListWidgetPage = () => {
  return (
    <>
      <Client />
      <PageHeader title={TITLE} description={DESCRIPTION} />
      <CreateReferralWidget patientId={1278} />
      <EditReferralWidget />
      <ReferralDetailsWidget />
      <PatientReferralsListWidget
        patientId={1278}
        title="Referrals"
        includeInactive
      />
    </>
  )
}

export default PatientReferralsListWidgetPage
