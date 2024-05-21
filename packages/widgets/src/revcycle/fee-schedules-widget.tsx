import { REVCYCLE_URL } from '@psychplus/utils/constants'
import { createSearchParams } from '@psychplus/utils/url'
import { PortalContainer } from '../components'

const FeeSchedulesWidget = () => {
  const params = createSearchParams({})

  return (
    <PortalContainer
      src={`${REVCYCLE_URL}/revcycle/widgets/fee-schedules?${params.toString()}`}
      name="fee-schedules"
    />
  )
}

export { FeeSchedulesWidget }
