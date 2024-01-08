import { CLINICAL_URL } from '@psychplus/utils/constants'
import { getAuthToken } from '@psychplus/utils/cookies'
import { createSearchParams } from '@psychplus/utils/url'
import { USER_WIDGET } from '..'
import { WidgetPortal } from '../components'

const UserWidget = () => {
  const searchParams = createSearchParams({
    token: getAuthToken(),
  })

  return (
    <WidgetPortal
      src={`${CLINICAL_URL}/widgets/user?${searchParams.toString()}`}
      name={USER_WIDGET}
    />
  )
}

export { UserWidget }
