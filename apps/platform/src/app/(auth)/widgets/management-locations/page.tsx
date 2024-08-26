import {
  AddManagmentLocationWidget,
  ManagementLocationsWidget,
} from '@psychplus/widgets/clinical'
import { PageHeader } from '../../shared/page-header'
import { Client } from './client'

const TITLE = 'Mangement Locations Widget'
const DESCRIPTION = 'Displays management locations information'

const PatientRelationshipWidgetPage = () => (
  <>
    <Client />
    <PageHeader title={TITLE} description={DESCRIPTION} />
    <ManagementLocationsWidget />
    <AddManagmentLocationWidget />
  </>
)

export default PatientRelationshipWidgetPage
