import { getAuthToken } from '@psychplus/auth'
import { PortalContainer } from '@psychplus/components'

const KRAKEN_URL = process.env.KRAKEN_URL

const UserWidget = () => {
  const params = new URLSearchParams()

  const token = getAuthToken()

  if (token) {
    params.append('token', token)
  }

  return (
    <PortalContainer src={`${KRAKEN_URL}/widgets/user?${params.toString()}`} />
  )
}

export { UserWidget }
