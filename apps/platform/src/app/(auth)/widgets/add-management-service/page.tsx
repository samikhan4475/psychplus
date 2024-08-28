import { AddManagementServiceWidget } from '@psychplus/widgets/clinical'
import { PageHeader } from '../../shared/page-header'
import { OpenButton } from './open-button'

const TITLE = 'Add Management Service Widget'
const DESCRIPTION = 'A dialog form to add management service.'

const AddManagementServiceWidgetPage = () => {
  return (
    <>
      <PageHeader title={TITLE} description={DESCRIPTION} />
      <OpenButton />
      <AddManagementServiceWidget />
    </>
  )
}

export default AddManagementServiceWidgetPage
