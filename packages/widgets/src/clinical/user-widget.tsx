import { CLINICAL_URL } from '@psychplus/utils/constants'
import { getAuthToken } from '@psychplus/utils/cookies'
import { createSearchParams } from '@psychplus/utils/url'
import { PortalContainer } from '../components'

const UserWidget = () => {
  const searchParams = createSearchParams({
    token: getAuthToken(),
  })

  return (
    <PortalContainer
      src={`${CLINICAL_URL}/widgets/user?${searchParams.toString()}`}
    />
  )
}

export { UserWidget }
