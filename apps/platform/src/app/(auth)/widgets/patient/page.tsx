import { PatientWidgetPortal } from '@psychplus/widgets/client'
import { SectionHeader } from '../../shared/section-header'

const TITLE = 'Patient Widget'
const DESCRIPTION = 'Displays patient information.'

const PatientWidgetPage = () => (
  <>
    <SectionHeader title={TITLE} description={DESCRIPTION} />
    <div className="h-[400px] w-[800px]">
      <PatientWidgetPortal patientId="10560" />
    </div>
  </>
)

export default PatientWidgetPage
