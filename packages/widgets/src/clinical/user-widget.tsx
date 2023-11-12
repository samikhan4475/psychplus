import { CLINICAL_URL } from '@psychplus/utils/constants'
import { createUrlParams } from '@psychplus/utils/url'
import { PortalContainer } from '../components'

const UserWidget = () => {
  return (
    <PortalContainer
      src={`${CLINICAL_URL}/widgets/user?${createUrlParams().toString()}`}
    />
  )
}

export { UserWidget }
