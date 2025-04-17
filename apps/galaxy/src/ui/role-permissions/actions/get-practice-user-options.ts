'use server'

import * as api from '@/api'
import { Role, SelectOptionType, StaffResource } from '@/types'

interface GetUserRoleListParams {
  userId: string
  practiceId: string
}

const getUserRoleOptionsAction = async ({
  userId,
  practiceId,
}: GetUserRoleListParams): Promise<api.ActionResult<SelectOptionType[]>> => {
  const response = await api.POST<StaffResource[]>(
    `${api.GET_PRACTICE_USERS_LIST_ENDPOINT(userId, practiceId)}`,
  )

  if (response.state === 'error') {
    return {
      state: 'error',
      error: response.error,
    }
  }

  const transformedData = response.data.map((data) => ({
    value: data.id,
    label: `${data.legalName.firstName} ${data.legalName.lastName}`,
  }))

  return {
    state: 'success',
    data: transformedData,
  }
}

export { getUserRoleOptionsAction }
