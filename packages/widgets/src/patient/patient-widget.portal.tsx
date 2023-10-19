import { getAuthToken } from '@psychplus/auth'
import { PortalContainer } from '@psychplus/components'
import { PatientWidgetProps } from './patient-widget.server'

const HYDRA_URL = process.env.HYDRA_URL

const buildWidgetUrl = ({ token, patientId }: PatientWidgetProps) => {
  token = token ?? getAuthToken()

  const params = new URLSearchParams()

  if (token) {
    params.append('token', token)
  }

  if (patientId) {
    params.append('patientId', patientId)
  }

  return `${HYDRA_URL}/widgets/patient?${params.toString()}`
}

const PatientWidgetPortal = (props: PatientWidgetProps) => (
  <PortalContainer src={buildWidgetUrl(props)} />
)

export { PatientWidgetPortal }
