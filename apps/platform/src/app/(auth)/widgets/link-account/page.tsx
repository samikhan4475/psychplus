import { LinkAccountWidget } from '@psychplus/widgets/clinical'
import { PageHeader } from '../../shared/page-header'
import { Client } from './client'

const TITLE = 'Link Account Widget'
const DESCRIPTION = 'Displays link account table for staff.'

const LinkAccountWidgetPage = () => (
  <>
    <PageHeader title={TITLE} description={DESCRIPTION} />
    <Client />
    <LinkAccountWidget patientId={1278} />
  </>
)

export default LinkAccountWidgetPage
