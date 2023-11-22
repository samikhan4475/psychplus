import { REVCYCLE_URL } from '@psychplus/utils/constants'
import { createUrlParams } from '@psychplus/utils/url'
import { PortalContainer } from '../components'

const FeeSchedulesWidget = () => {
  const params = createUrlParams()

  return (
    <PortalContainer
      src={`${REVCYCLE_URL}/widgets/fee-schedules?${params.toString()}`}
    />
  )
}

export { FeeSchedulesWidget }
