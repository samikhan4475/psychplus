import { CLINICAL_URL } from '@psychplus/utils/constants'
import { getAuthToken } from '@psychplus/utils/cookies'
import { createSearchParams } from '@psychplus/utils/url'
import { PortalContainer } from '../components'

const PatientLookupWidget = () => {
  const searchParams = createSearchParams({
    token: getAuthToken(),
  })

  return (
    <PortalContainer
      src={`${CLINICAL_URL}/widgets/patient-lookup?${searchParams.toString()}`}
    />
  )
}

export { PatientLookupWidget }
