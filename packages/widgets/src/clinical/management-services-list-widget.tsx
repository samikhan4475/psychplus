import { CLINICAL_URL } from '@psychplus/utils/constants'
import { getAuthToken } from '@psychplus/utils/cookies'
import { createSearchParams } from '@psychplus/utils/url'
import { MANAGEMENT_SERVICES_LIST_WIDGET } from '..'
import { WidgetPortal } from '../components'

const ManagementServicesListWidget = () => {
  const searchParams = createSearchParams({
    token: getAuthToken(),
  })

  return (
    <WidgetPortal
      src={`${CLINICAL_URL}/galaxy/widgets/management-services-list?${searchParams.toString()}`}
      name={MANAGEMENT_SERVICES_LIST_WIDGET}
    />
  )
}

export { ManagementServicesListWidget }
