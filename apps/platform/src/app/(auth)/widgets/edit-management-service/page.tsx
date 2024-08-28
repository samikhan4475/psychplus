import { EditManagementServiceWidget } from '@psychplus/widgets/clinical'
import { PageHeader } from '../../shared/page-header'
import { Client } from './client'

const TITLE = 'Management Serivce Profile Section'
const DESCRIPTION = 'A widget for managment profile section'

const EditManagementServiceWidgetPage = () => {
  return (
    <>
      <Client />
      <PageHeader title={TITLE} description={DESCRIPTION} />
      <EditManagementServiceWidget />
    </>
  )
}

export default EditManagementServiceWidgetPage
