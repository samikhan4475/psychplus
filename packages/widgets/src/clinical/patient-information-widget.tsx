import { type PatientParams } from '@psychplus/patient'
import { CLINICAL_URL } from '@psychplus/utils/constants'
import { getAuthToken } from '@psychplus/utils/cookies'
import { createSearchParams } from '@psychplus/utils/url'
import { PortalContainer } from '../components'

type Props = PatientParams

const PatientInformationWidget = (props: Props) => {
  const searchParams = createSearchParams({
    token: getAuthToken(),
    patientId: `${props.patientId}`,
  })

  return (
    <PortalContainer
      src={`${CLINICAL_URL}/widgets/patient-information?${searchParams.toString()}`}
      name="patient-information"
    />
  )
}

export { PatientInformationWidget }
