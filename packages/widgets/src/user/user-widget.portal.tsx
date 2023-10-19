import { getAuthToken } from '@psychplus/auth'
import { PortalContainer } from '@psychplus/components'
import { UserWidgetProps } from './user-widget.server'

const KRAKEN_URL = process.env.KRAKEN_URL

const buildWidgetUrl = ({ token }: UserWidgetProps) => {
  token = token ?? getAuthToken()

  const params = new URLSearchParams()

  if (token) {
    params.append('token', token)
  }

  return `${KRAKEN_URL}/widgets/user?${params.toString()}`
}

const UserWidgetPortal = (props: UserWidgetProps) => (
  <PortalContainer src={buildWidgetUrl(props)} />
)

export { UserWidgetPortal }
