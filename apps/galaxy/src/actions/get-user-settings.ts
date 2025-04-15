'use server'

import * as api from '@/api'
import { SettingSearchFilters, Sort, UserSetting } from '@/types'

const getUserSettings = async (
  filters: SettingSearchFilters,
  page?: number,
  pageSize?: number,
  sort?: Sort,
): Promise<api.ActionResult<UserSetting[]>> => {
  const url = new URL(api.GET_CURRENT_USER_SETTINGS_SEARCH)
  if (sort) {
    url.searchParams.append(
      'orderBy',
      `level asc,${sort.column} ${sort.direction}`,
    )
  }
  if (page && pageSize) {
    const offset = (page - 1) * pageSize
    url.searchParams.append('limit', String(pageSize))
    url.searchParams.append('offset', String(offset))
  }
  const response = await api.POST<UserSetting[]>(url.toString(), filters)
  if (response.state === 'error') {
    return {
      state: 'error',
      error: response.error,
    }
  }
  return {
    state: 'success',
    data: response.data,
    total: Number(response.headers.get('psychplus-totalresourcecount')),
  }
}

export { getUserSettings }
