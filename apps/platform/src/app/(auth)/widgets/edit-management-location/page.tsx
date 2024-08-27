import { EditManagementLocationWidget } from '@psychplus/widgets/clinical'
import { PageHeader } from '../../shared/page-header'
import { Client } from './client'

const TITLE = 'Edit Location Widget'
const DESCRIPTION = 'Edit Location Widget'

const EditManagmentLocationWidgetPage = () => {
  return (
    <>
      <Client />
      <PageHeader title={TITLE} description={DESCRIPTION} />
      <EditManagementLocationWidget />
    </>
  )
}

export default EditManagmentLocationWidgetPage
