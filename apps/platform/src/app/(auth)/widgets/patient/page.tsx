import { PatientWidget } from '@psychplus/widgets/revcycle'
import { PageHeader } from '../../shared/page-header'

const TITLE = 'Patient Widget'
const DESCRIPTION = 'Displays patient information.'

const PatientWidgetPage = () => (
  <>
    <PageHeader title={TITLE} description={DESCRIPTION} />

    <div className="h-[400px] w-[800px]">
      <PatientWidget patientId={1278} />
    </div>
  </>
)

export default PatientWidgetPage
