import { CLINICAL_URL } from '@psychplus/env'
import { getAuthToken } from '@psychplus/auth'
import { PortalContainer } from '@psychplus/components/widget'

const UserWidget = () => {
  const params = new URLSearchParams()

  const token = getAuthToken()

  if (token) {
    params.append('token', token)
  }

  return (
    <PortalContainer
      src={`${CLINICAL_URL}/widgets/user?${params.toString()}`}
    />
  )
}

export { UserWidget }
