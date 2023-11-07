import { CLINICAL_URL } from '@psychplus/env'
import type { PatientParams } from '@psychplus/types'
import { getAuthToken } from '@psychplus/auth'
import { PortalContainer } from '@psychplus/components/widget'

type Props = PatientParams

const PatientReferralsWidget = (props: Props) => {
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
      src={`${CLINICAL_URL}/widgets/patient-referrals?${params.toString()}`}
    />
  )
}

export { PatientReferralsWidget }
