import { cache } from 'react'
import { handleRequest } from '@psychplus/utils/api'
import { forwardQuery } from '@psychplus/utils/client'
import { Clinic, ClinicsDistanceRequest } from '.'

const getClinicsDistanceForUnauthenticatedUser = async (
  request: ClinicsDistanceRequest,
): Promise<Clinic[]> => {
  const { latitude = 0, longitude = 0, miles = 20 } = request

  return handleRequest(
    fetch(
      forwardQuery(
        `/api/clinics/distance/unauthenticated?miles=${miles}&latitude=${latitude}&longitude=${longitude}&postalcode=${request.postalcode}&includeTest=false`,
      ),
      {
        cache: 'no-store',
      },
    ),
  )
}

const getClinicsDistanceForUnauthenticatedUserCached = cache(
  getClinicsDistanceForUnauthenticatedUser,
)
export { getClinicsDistanceForUnauthenticatedUserCached as getClinicsDistanceForUnauthenticatedUser }
