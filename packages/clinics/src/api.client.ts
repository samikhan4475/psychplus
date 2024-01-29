import { handleRequest } from '@psychplus/utils/api'
import { createHeaders } from '@psychplus/utils/client'
import { Clinic, ClinicsDistancePayload } from '.'

const getClinicsDistanceForUnauthenticatedUser = async (
  request: ClinicsDistancePayload,
): Promise<Clinic[]> => {
  const { latitude = 0, longitude = 0, miles = 20 } = request

  return handleRequest(
    fetch(
      `/api/clinics/distance/unauthenticated?miles=${miles}&latitude=${latitude}&longitude=${longitude}&postalcode=${request.postalcode}&includeTest=false`,
      {
        cache: 'no-store',
        headers: createHeaders(),
      },
    ),
  )
}

export { getClinicsDistanceForUnauthenticatedUser }
