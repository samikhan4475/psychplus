import * as api from '@/api'
import { SettingSearchFilters, UserSetting } from '@/types'

const getUserSettings = async (
  filters: SettingSearchFilters,
): Promise<api.ActionResult<UserSetting[]>> => {
  const response = await api.POST<UserSetting[]>(
    api.GET_CURRENT_USER_SETTINGS_SEARCH,
    filters,
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

export { getUserSettings }
