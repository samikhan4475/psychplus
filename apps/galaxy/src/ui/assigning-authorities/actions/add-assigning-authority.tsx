'use server'

import * as api from '@/api'
import { AssigningAuthority } from '@/ui/assigning-authorities/types'

interface AddAssigningAuthorityPayload {
  namespace: string
  displayName: string
  oid?: string
  viewPermissionCode?: string
  editPermissionCode?: string
}

const addAssigningAuthority = async (
  payload: AddAssigningAuthorityPayload,
): Promise<api.ActionResult<AssigningAuthority>> => {
  const response = await api.POST<AssigningAuthority>(
    `${api.ADD_ASSIGNING_AUTHORITY}`,
    payload,
  )

  if (response.state === 'error') {
    return {
      state: 'error',
      error: response.error,
    }
  }

  return {
    state: 'success',
    data: response.data,
  }
}

export { addAssigningAuthority }
