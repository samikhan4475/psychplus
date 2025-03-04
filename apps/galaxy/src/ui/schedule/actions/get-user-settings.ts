'use server'

import * as api from '@/api'
import { PrescriberSettingResponse } from '@/ui/staff-credentialing/types'
import { UserSetting } from '../types'

const getUserSettingsAction = async (): Promise<
  api.ActionResult<UserSetting[]>
> => {
  const response = await api.GET<PrescriberSettingResponse[]>(
    api.GET_CURRENT_USER_SETTINGS
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

export { getUserSettingsAction }
