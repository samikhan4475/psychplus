import { type PatientParams } from '@psychplus/patient'
import { REVCYCLE_URL } from '@psychplus/utils/constants'
import { createUrlParams } from '@psychplus/utils/url'
import { PortalContainer } from '../components'

type Props = PatientParams

const PatientWidget = (props: Props) => {
  const params = createUrlParams({
    patientId: props.patientId,
  })

  return (
    <PortalContainer
      src={`${REVCYCLE_URL}/widgets/patient?${params.toString()}`}
    />
  )
}

export { PatientWidget }
