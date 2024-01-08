import { PatientInformationWidget } from '@psychplus/widgets/clinical'
import { PageHeader } from '../../shared/page-header'

const TITLE = 'Patient Information Widget'
const DESCRIPTION = 'Displays patient Information.'

const PatientInformationWidgetPage = () => (
  <>
    <PageHeader title={TITLE} description={DESCRIPTION} />

    <div className="h-[500px] w-[1200px]">
      <PatientInformationWidget patientId={1278} />
    </div>
  </>
)

export default PatientInformationWidgetPage
