'use server'

import * as api from '@/api'
import { Role, SelectOptionType } from '@/types'

interface Payload {
  userId: string
  practiceId: string
}

const getRoleOptionsAction = async ({
  userId,
  practiceId,
}: Payload): Promise<api.ActionResult<SelectOptionType[]>> => {
  const response = await api.GET<Role[]>(
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
    label: data.displayName,
  }))

  return {
    state: 'success',
    data: transformedData,
  }
}

export { getRoleOptionsAction }
