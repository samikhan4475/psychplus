import { AddRelationshipWidget } from '@psychplus/widgets/clinical'
import { PageHeader } from '../../shared/page-header'
import { OpenButton } from './open-button'

const TITLE = 'Add Relationship Widget'
const DESCRIPTION = 'A dialog form to add relationship.'

const AddAuthWidgetPage = () => {
  return (
    <>
      <PageHeader title={TITLE} description={DESCRIPTION} />
      <OpenButton />
      <AddRelationshipWidget patientId={1278} />
    </>
  )
}

export default AddAuthWidgetPage
