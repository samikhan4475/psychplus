import type { PatientParams } from '@psychplus/types'
import { getAuthToken } from '@psychplus/auth'
import { PortalContainer } from '@psychplus/components'

const HYDRA_URL = process.env.HYDRA_URL

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
      src={`${HYDRA_URL}/widgets/patient?${params.toString()}`}
    />
  )
}

export { PatientWidget }
