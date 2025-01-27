'use server'

import * as api from '@/api'
import { PrescriberSettingResponse } from '../types'

const defaultPayload = {
  settingStatusCode: 'Active',
  levelCode: 'User',
  categoryCode: 'Application',
  categoryValue: 'PrescriberSettings',
}

interface UpdatePrescriberSettingsParams {
  userId: string
  settingId: string
  payload: Partial<PrescriberSettingResponse>
}

const updatePrescriberSettingsAction = async ({
  userId,
  settingId,
  payload,
}: UpdatePrescriberSettingsParams): Promise<
  api.ActionResult<PrescriberSettingResponse[]>
> => {
  const response = await api.PUT<PrescriberSettingResponse[]>(
    api.UPDATE_USER_SETTINGS(userId, settingId),
    { ...defaultPayload, ...payload, id: settingId },
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

export { updatePrescriberSettingsAction }
