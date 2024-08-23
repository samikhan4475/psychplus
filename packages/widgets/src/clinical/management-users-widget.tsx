import { CLINICAL_URL } from '@psychplus/utils/constants'
import { getAuthToken } from '@psychplus/utils/cookies'
import { createSearchParams } from '@psychplus/utils/url'
import { MANAGEMENT_USERS_WIDGET } from '..'
import { WidgetPortal } from '../components'

const ManagementUsersWidget = () => {
  const searchParams = createSearchParams({
    token: getAuthToken(),
  })

  return (
    <WidgetPortal
      src={`${CLINICAL_URL}/widgets/management-users?${searchParams.toString()}`}
      name={MANAGEMENT_USERS_WIDGET}
    />
  )
}

export { ManagementUsersWidget }
