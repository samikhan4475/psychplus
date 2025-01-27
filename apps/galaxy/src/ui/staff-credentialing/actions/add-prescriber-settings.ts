'use server'

import * as api from '@/api'
import { PrescriberSettingResponse } from '../types'

const defaultPayload = {
  settingStatusCode: 'Active',
  levelCode: 'User',
  categoryCode: 'Application',
  categoryValue: 'PrescriberSettings',
}

interface AddPrescriberSettingsParams {
  userId: string
  payload: Partial<PrescriberSettingResponse>
}

const addPrescriberSettingsAction = async ({
  userId,
  payload,
}: AddPrescriberSettingsParams): Promise<
  api.ActionResult<PrescriberSettingResponse[]>
> => {
  const response = await api.POST<PrescriberSettingResponse[]>(
    api.ADD_USER_SETTINGS(userId),
    { ...defaultPayload, ...payload },
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

export { addPrescriberSettingsAction }
