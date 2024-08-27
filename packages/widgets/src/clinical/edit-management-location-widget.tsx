import { CLINICAL_URL } from '@psychplus/utils/constants'
import { getAuthToken } from '@psychplus/utils/cookies'
import { createSearchParams } from '@psychplus/utils/url'
import { EDIT_MANAGEMENT_LOCATION_WIDGET } from '..'
import { WidgetPortal } from '../components'

const EditManagementLocationWidget = () => {
  const searchParams = createSearchParams({
    token: getAuthToken(),
  })

  return (
    <WidgetPortal
      src={`${CLINICAL_URL}/galaxy/widgets/edit-management-location?${searchParams.toString()}`}
      name={EDIT_MANAGEMENT_LOCATION_WIDGET}
    />
  )
}

export { EditManagementLocationWidget }
