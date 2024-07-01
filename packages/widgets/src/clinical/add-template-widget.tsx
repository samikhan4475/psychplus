import { CLINICAL_URL } from '@psychplus/utils/constants'
import { getAuthToken } from '@psychplus/utils/cookies'
import { createSearchParams } from '@psychplus/utils/url'
import { ADD_TEMPLATE_WIDGET } from '..'
import { DialogPortal } from '../components'

const AddTemplateWidget = () => {
  const searchParams = createSearchParams({
    token: getAuthToken(),
  })

  return (
    <DialogPortal
      src={`${CLINICAL_URL}/widgets/add-template?${searchParams.toString()}`}
      name={ADD_TEMPLATE_WIDGET}
    />
  )
}

export { AddTemplateWidget }
