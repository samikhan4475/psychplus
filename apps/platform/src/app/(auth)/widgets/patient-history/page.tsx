import { PatientHistoryWidget } from '@psychplus/widgets/clinical'
import { PageHeader } from '../../shared/page-header'
import { OpenButton } from './open-button'

const TITLE = 'Patient History popup'
const DESCRIPTION = 'A dialog box that displays patient information history'

const PatientHistoryWidgetPage = () => (
  <>
    <PageHeader title={TITLE} description={DESCRIPTION} />
    <OpenButton />
    <PatientHistoryWidget patientId={1278} />
  </>
)

export default PatientHistoryWidgetPage
