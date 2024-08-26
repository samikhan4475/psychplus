import { CLINICAL_URL } from '@psychplus/utils/constants'
import { getAuthToken } from '@psychplus/utils/cookies'
import { createSearchParams } from '@psychplus/utils/url'
import { MANAGEMENT_LOCATIONS_WIDGET } from '..'
import { WidgetPortal } from '../components'

const ManagementLocationsWidget = () => {
  const searchParams = createSearchParams({
    token: getAuthToken(),
  })

  return (
    <WidgetPortal
      src={`${CLINICAL_URL}/widgets/management-locations?${searchParams.toString()}`}
      name={MANAGEMENT_LOCATIONS_WIDGET}
      isShadowLess
    />
  )
}

export { ManagementLocationsWidget }
