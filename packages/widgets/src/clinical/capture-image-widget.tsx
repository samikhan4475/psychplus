import { CLINICAL_URL } from '@psychplus/utils/constants'
import { CAPTURE_IMAGE_WIDGET } from '..'
import { DialogPortal } from '../components'

const CaptureImageWidget = () => {

  return (
    <DialogPortal
      src={`${CLINICAL_URL}/widgets/image-capture`}
      name={CAPTURE_IMAGE_WIDGET}
      permission='camera'
    />
  )
}

export { CaptureImageWidget }
