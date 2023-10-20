import { REVCYCLE_URL } from '@psychplus/env'
import type { PatientParams } from '@psychplus/types'
import { getAuthToken } from '@psychplus/auth'
import { PortalContainer } from '@psychplus/components'

type Props = PatientParams

const PatientWidget = (props: Props) => {
  const params = new URLSearchParams()

  const token = getAuthToken()

  if (token) {
    params.append('token', token)
  }

  if (props.patientId) {
    params.append('patientId', props.patientId)
  }

  return (
    <PortalContainer
      src={`${REVCYCLE_URL}/widgets/patient?${params.toString()}`}
    />
  )
}

export { PatientWidget }
