import { REVCYCLE_URL } from '@psychplus/utils/constants'
import { createSearchParams } from '@psychplus/utils/url'
import { PortalContainer } from '../components'

const CodingWidget = () => {
  const params = createSearchParams({})

  return (
    <PortalContainer
      src={`${REVCYCLE_URL}/widgets/coding?${params.toString()}`}
      name="coding"
    />
  )
}

export { CodingWidget }