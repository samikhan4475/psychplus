import { PatientReferralsWidget } from '@psychplus/widgets'
import { PageHeader } from '../../shared/page-header'

const TITLE = 'Patient Referrals Widget'
const DESCRIPTION = 'Displays patient referrals.'

const PatientReferralsWidgetPage = () => (
  <>
    <PageHeader title={TITLE} description={DESCRIPTION} />

    <div className="h-[500px] w-[1200px]">
      <PatientReferralsWidget patientId="10560" />
    </div>
  </>
)

export default PatientReferralsWidgetPage
