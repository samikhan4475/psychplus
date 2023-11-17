import { type PatientParams } from '@psychplus/patient'
import { REVCYCLE_URL } from '@psychplus/utils/constants'
import { getAuthToken } from '@psychplus/utils/cookies'
import { createSearchParams } from '@psychplus/utils/url'
import { PortalContainer } from '../components'

type Props = PatientParams

const PatientWidget = (props: Props) => {
  const searchParams = createSearchParams({
    token: getAuthToken(),
    patientId: props.patientId,
  })

  return (
    <PortalContainer
      src={`${REVCYCLE_URL}/widgets/patient?${searchParams.toString()}`}
    />
  )
}

export { PatientWidget }
