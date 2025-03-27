'use client'

import * as api from '@/api/api.client'
import { UPDATE_BULK_USER_SETTINGS } from '@/api/endpoints'
import { AddOthersSettingBody, Metadata } from '@/types'

interface UpdateBulkPreferenceSettingsResponse {
  id: string
  metadata: Metadata
  settingStatusCode: string
  levelCode: string
  categoryCode: string
  categoryValue: string
  name: string
  content: string
}

const updateBulkPreferenceSettings = async (
  payload: AddOthersSettingBody[],
  userId: number,
): Promise<api.ActionResult<UpdateBulkPreferenceSettingsResponse[]>> => {
  const response = await api.PUT<UpdateBulkPreferenceSettingsResponse[]>(
    UPDATE_BULK_USER_SETTINGS(userId),
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

export {
  updateBulkPreferenceSettings,
  type UpdateBulkPreferenceSettingsResponse,
}
