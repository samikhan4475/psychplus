import { PatientRelationshipWidget } from '@psychplus/widgets/clinical'
import { PageHeader } from '../../shared/page-header'
import { Client } from './client'

const TITLE = 'Patient Relationships Widget'
const DESCRIPTION = 'Displays patient relationship information'

const PatientRelationshipWidgetPage = () => (
  <>
    <PageHeader title={TITLE} description={DESCRIPTION} />
    <Client />
    <PatientRelationshipWidget patientId={1278} />
  </>
)

export default PatientRelationshipWidgetPage
