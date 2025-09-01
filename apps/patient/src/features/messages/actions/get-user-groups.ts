'use server'

import * as api from '@psychplus-v2/api'
import { type ActionResult } from '@psychplus-v2/api'
import { API_URL } from '@psychplus-v2/env'
import { UserGroup } from '../types'

const getUserGroups = async (): Promise<ActionResult<UserGroup[]>> => {
  const url = new URL(`${API_URL}/api/usergroups/action/search`)
  url.searchParams.append('offset', '0')
  url.searchParams.append('limit', '0')

  const result = await api.POST<UserGroup[]>(url.toString(), {
    userGroupTypes: ['BillingTeam', 'SchedulingTeam'],
  })

  if (result.state === 'error') {
    return {
      state: 'error',
      error: result.error,
    }
  }

  return {
    state: 'success',
    data: result.data,
  }
}

export { getUserGroups }
