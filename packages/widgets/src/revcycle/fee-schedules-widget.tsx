import { REVCYCLE_URL } from '@psychplus/utils/constants'
import { createSearchParams } from '@psychplus/utils/url'
import { PortalContainer } from '../components'

const FeeSchedulesWidget = () => {
  const params = createSearchParams({})

  return (
    <PortalContainer
      src={`${REVCYCLE_URL}/widgets/fee-schedules?${params.toString()}`}
    />
  )
}

export { FeeSchedulesWidget }
