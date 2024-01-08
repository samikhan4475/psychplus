import {
  CreateReferralWidget,
  EditReferralWidget,
  PatientReferralsListWidget,
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
      <CreateReferralWidget patientId={1279} />
      <EditReferralWidget />
      <PatientReferralsListWidget patientId={1279} includeInactive />
    </>
  )
}

export default PatientReferralsListWidgetPage
