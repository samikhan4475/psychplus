import { CLINICAL_URL } from '@psychplus/utils/constants'
import { ENLARGE_IMAGE_WIDGET } from '..'
import { DialogPortal } from '../components'

const EnlargeImageWidget = () => {

  return (
    <DialogPortal
      src={`${CLINICAL_URL}/widgets/enlarge-image`}
      name={ENLARGE_IMAGE_WIDGET}
    />
  )
}

export { EnlargeImageWidget }
