import { CLINICAL_URL } from '@psychplus/utils/constants'
import { getAuthToken } from '@psychplus/utils/cookies'
import { createSearchParams } from '@psychplus/utils/url'
import { EDIT_TEMPLATE_WIDGET } from '..'
import { DialogPortal } from '../components'

const EditTemplateWidget = () => {
  const searchParams = createSearchParams({
    token: getAuthToken(),
  })

  return (
    <DialogPortal
      src={`${CLINICAL_URL}/galaxy/widgets/edit-template/?${searchParams.toString()}`}
      name={EDIT_TEMPLATE_WIDGET}
    />
  )
}

export { EditTemplateWidget }
