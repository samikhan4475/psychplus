import { EditReferralWidget } from '@psychplus/widgets/clinical'
import { PageHeader } from '../../shared/page-header'
import { OpenButton } from './open-button'

const TITLE = 'Edit Referral Widget'
const DESCRIPTION = 'A dialog form to edit a referral.'

const EditReferralWidgetPage = () => {
  return (
    <>
      <PageHeader title={TITLE} description={DESCRIPTION} />
      <OpenButton />
      <EditReferralWidget />
    </>
  )
}

export default EditReferralWidgetPage
