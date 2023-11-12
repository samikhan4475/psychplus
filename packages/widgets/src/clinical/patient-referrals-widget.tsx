import { type PatientParams } from '@psychplus/patient'
import { CLINICAL_URL } from '@psychplus/utils/constants'
import { createUrlParams } from '@psychplus/utils/url'
import { PortalContainer } from '../components'

type Props = PatientParams

const PatientReferralsWidget = (props: Props) => {
  const params = createUrlParams({
    patientId: props.patientId,
  })

  return (
    <PortalContainer
      src={`${CLINICAL_URL}/widgets/patient-referrals?${params.toString()}`}
    />
  )
}

export { PatientReferralsWidget }
