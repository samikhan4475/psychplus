import { CLINICAL_URL } from '@psychplus/utils/constants'
import { getAuthToken } from '@psychplus/utils/cookies'
import { createSearchParams } from '@psychplus/utils/url'
import { ADD_MANAGEMENT_LOCATIONS_WIDGET } from '..'
import { DialogPortal } from '../components'

const AddManagmentLocationWidget = () => {
  const searchParams = createSearchParams({
    token: getAuthToken(),
  })

  return (
    <DialogPortal
      src={`${CLINICAL_URL}/widgets/add-management-location?${searchParams.toString()}`}
      name={ADD_MANAGEMENT_LOCATIONS_WIDGET}
    />
  )
}

export { AddManagmentLocationWidget }
