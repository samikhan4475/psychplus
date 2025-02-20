'use server'

import * as api from '@/api'
import { PrescriberSettingResponse } from '../types'

interface SettingsHistoryParams {
  historyCreatedFrom?: string
  historyCreatedTo?: string
  createdById?: number
  settingIds: string[]
}
const getSettingsHistoryAction = async (
  payload: SettingsHistoryParams,
): Promise<api.ActionResult<PrescriberSettingResponse[]>> => {
  const response = await api.POST<PrescriberSettingResponse[]>(
    api.SETTINGS_HISTORY_ENDPOINT,
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

export { getSettingsHistoryAction }