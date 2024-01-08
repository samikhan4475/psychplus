import { CreateReferralWidget } from '@psychplus/widgets/clinical'
import { PageHeader } from '../../shared/page-header'
import { OpenButton } from './open-button'

const TITLE = 'Create Referral Widget'
const DESCRIPTION = 'A dialog form to create a referral.'

const CreateReferralWidgetPage = () => {
  return (
    <>
      <PageHeader title={TITLE} description={DESCRIPTION} />
      <OpenButton />
      <CreateReferralWidget patientId={1278} />
    </>
  )
}

export default CreateReferralWidgetPage
