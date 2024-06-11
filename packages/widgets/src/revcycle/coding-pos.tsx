import { REVCYCLE_URL } from '@psychplus/utils/constants'
import { PortalContainer } from '../components'

const CodingPOSWidget = () => {
  return (
    <PortalContainer
      src={`${REVCYCLE_URL}/revcycle/widgets/coding-pos`}
      name="coding-pos"
    />
  )
}

export { CodingPOSWidget }
