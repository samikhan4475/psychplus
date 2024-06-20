import { REVCYCLE_URL } from '@psychplus/utils/constants'
import { createSearchParams } from '@psychplus/utils/url'
import { PortalContainer } from '../components'

const ClearingHouseWidget = () => {
  const params = createSearchParams({})

  return (
    <PortalContainer
      src={`${REVCYCLE_URL}/revcycle/widgets/clearing-house?${params.toString()}`}
      name="clearinghouse"
    />
  )
}

export { ClearingHouseWidget }
