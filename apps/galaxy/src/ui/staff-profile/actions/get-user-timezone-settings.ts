'use server'

import * as api from '@/api'
import { PrescriberSettingResponse } from '@/ui/staff-credentialing/types'

interface GetUserTimeZoneSettingsParams {
  userId: string
  level: string
  categoryValue: string
}

const getUserTimeZoneSettingsActions = async ({
  userId,
  level,
  categoryValue,
}: GetUserTimeZoneSettingsParams): Promise<
  api.ActionResult<PrescriberSettingResponse[]>
> => {
  const url = new URL(api.ADD_USER_SETTINGS(userId))
  url.searchParams.append('level', level)
  url.searchParams.append('categoryValue', categoryValue)
  const response = await api.GET<PrescriberSettingResponse[]>(`${url}`)

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

export { getUserTimeZoneSettingsActions }
