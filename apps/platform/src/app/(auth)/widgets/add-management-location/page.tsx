import { AddManagmentLocationWidget } from '@psychplus/widgets/clinical'
import { PageHeader } from '../../shared/page-header'
import { OpenButton } from './open-button'

const TITLE = 'Add Location Widget'
const DESCRIPTION = 'A dialog form to add location.'

const AddLocationPage = () => {
  return (
    <>
      <PageHeader title={TITLE} description={DESCRIPTION} />
      <OpenButton />
      <AddManagmentLocationWidget />
    </>
  )
}

export default AddLocationPage
