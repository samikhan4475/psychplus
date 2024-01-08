import { cache } from 'react'
import { handleRequest } from '@psychplus/utils/api'
import { createHeaders } from '@psychplus/utils/client'
import type { Staff, StaffRequest } from './types'

const getStaffForUnauthenticatedUser = async (
  request: StaffRequest,
): Promise<Staff[]> =>
  handleRequest(
    fetch(
      '/api/staff/search/unauthenticated?includeInactive=false&offset=0&limit=0&orderBy=legalName%20asc',
      {
        method: 'POST',
        body: JSON.stringify(request),
        cache: 'no-store',
        headers: createHeaders(),
      },
    ),
  )
const getStaffProfilePicture = async (staffId: number): Promise<Staff> =>
  handleRequest(
    fetch(`/api/staff/${staffId}/profileimage`, {
      next: {
        revalidate: 3600,
      },
      headers: createHeaders(),
    }),
  )

const getStaffProfilePictureCached = cache(getStaffProfilePicture)

const getStaffForUnauthenticatedUserCached = cache(
  getStaffForUnauthenticatedUser,
)

export { getStaffProfilePictureCached as getStaffProfilePicture }
export { getStaffForUnauthenticatedUserCached as getStaffForUnauthenticatedUser }
