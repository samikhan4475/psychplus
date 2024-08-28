import { CLINICAL_URL } from '@psychplus/utils/constants'
import { getAuthToken } from '@psychplus/utils/cookies'
import { createSearchParams } from '@psychplus/utils/url'
import { EDIT_MANAGEMENT_SERVICE } from '..'
import { WidgetPortal } from '../components'

const EditManagementServiceWidget = () => {
  const searchParams = createSearchParams({
    token: getAuthToken(),
  })

  return (
    <WidgetPortal
      src={`${CLINICAL_URL}/galaxy/widgets/edit-management-service?${searchParams.toString()}`}
      name={EDIT_MANAGEMENT_SERVICE}
    />
  )
}

export { EditManagementServiceWidget }
