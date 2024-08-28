import { CLINICAL_URL } from '@psychplus/utils/constants'
import { getAuthToken } from '@psychplus/utils/cookies'
import { createSearchParams } from '@psychplus/utils/url'
import { ADD_MANAGEMENT_SERVICE_WIDGET } from '..'
import { DialogPortal } from '../components'

const AddManagementServiceWidget = () => {
  const searchParams = createSearchParams({
    token: getAuthToken(),
  })

  return (
    <DialogPortal
      src={`${CLINICAL_URL}/widgets/add-management-service?${searchParams.toString()}`}
      name={ADD_MANAGEMENT_SERVICE_WIDGET}
    />
  )
}

export { AddManagementServiceWidget }
