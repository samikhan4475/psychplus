import { PreferredPartnersWidget } from '@psychplus/widgets/clinical'
import { PageHeader } from '../../shared/page-header'
import { Client } from './client'

const TITLE = 'Patient Preferred Partners Widget'
const DESCRIPTION = 'Displays preferred partners table for staff in patient inffo.'

const PreferredPartnersWidgetPage = () => (
  <>
    <PageHeader title={TITLE} description={DESCRIPTION} />
    <Client />
    <PreferredPartnersWidget patientId={1278} />
  </>
)

export default PreferredPartnersWidgetPage
