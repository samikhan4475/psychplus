import { CaptureImageWidget } from '@psychplus/widgets/clinical'
import { PageHeader } from '../../shared/page-header'
import { OpenButton } from './open-button'

const TITLE = 'Image Capture Widget'
const DESCRIPTION = 'A dialog form to capture an image.'

const EditReferralWidgetPage = () => {
  return (
    <>
      <PageHeader title={TITLE} description={DESCRIPTION} />
      <OpenButton />
      <CaptureImageWidget />
    </>
  )
}

export default EditReferralWidgetPage
