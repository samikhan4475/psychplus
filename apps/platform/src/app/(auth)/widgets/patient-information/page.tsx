import { AddRelationshipWidget, CaptureImageWidget, EnlargeImageWidget, PatientInformationWidget } from '@psychplus/widgets/clinical'
import { PageHeader } from '../../shared/page-header'
import { Client } from './client'

const TITLE = 'Patient Information Widget'
const DESCRIPTION = 'Displays patient Information.'

const PatientInformationWidgetPage = () => (
  <>
    <PageHeader title={TITLE} description={DESCRIPTION} />
    <Client />
      <CaptureImageWidget />
      <EnlargeImageWidget />
      <AddRelationshipWidget patientId={1278} />
      <PatientInformationWidget patientId={1278} />
  </>
)

export default PatientInformationWidgetPage
