import { ManagementServicesListWidget } from '@psychplus/widgets/clinical'
import { PageHeader } from '../../shared/page-header'
import { Client } from './client'

const TITLE = 'Management Services Widget'
const DESCRIPTION = 'A table displaying all services.'

const ManagementServicesListWidgetPage = () => {
  return (
    <>
      <Client />
      <PageHeader title={TITLE} description={DESCRIPTION} />

      <ManagementServicesListWidget />
    </>
  )
}

export default ManagementServicesListWidgetPage
