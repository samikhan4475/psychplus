import { cache } from 'react'
import { handleRequest } from '@psychplus/utils/api'
import { createHeaders } from '@psychplus/utils/client'
import { Staff, StaffPayload, StaffRatingPayload } from '.'

const getStaffForUnauthenticatedUser = async (
  request: StaffPayload,
): Promise<Staff[]> => {
  return handleRequest(
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
}

const getStaffProfilePicture = async (staffId?: number) => {
  const response = await fetch(`/api/staff/${staffId}/profileimage`, {
    next: {
      revalidate: 3600,
    },
    headers: createHeaders(),
  })

  if (response.ok) {
    const blob = await response.blob()
    const url = URL.createObjectURL(blob)
    return url
  }
  return 'Staff does not have a photo assigned'
}

const addStaffStarRating = async (request: StaffRatingPayload) => {
  const { staffId, ...staffIdExcludedObj } = { ...request }

  return handleRequest(
    fetch(`/api/staff/${request.staffId}/ratings`, {
      method: 'POST',
      body: JSON.stringify(staffIdExcludedObj),
      cache: 'no-store',
      headers: createHeaders(),
    }),
  )
}

const getStaffProfilePictureCached = cache(getStaffProfilePicture)

const getStaffForUnauthenticatedUserCached = cache(
  getStaffForUnauthenticatedUser,
)

export { getStaffProfilePictureCached as getStaffProfilePicture }
export { getStaffForUnauthenticatedUserCached as getStaffForUnauthenticatedUser }
export { addStaffStarRating }
