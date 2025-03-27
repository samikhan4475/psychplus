'use client'

import * as api from '@/api/api.client'
import { ADD_BULK_USER_SETTINGS } from '@/api/endpoints'
import { AddOthersSettingBody, Metadata } from '@/types'

interface AddBulkPreferenceSettingsResponse {
  id: string
  metadata: Metadata
  settingStatusCode: string
  levelCode: string
  categoryCode: string
  categoryValue: string
  name: string
  content: string
}

const addBulkPreferenceSettings = async (
  payload: AddOthersSettingBody[],
  userId: number,
): Promise<api.ActionResult<AddBulkPreferenceSettingsResponse[]>> => {
  const response = await api.POST<AddBulkPreferenceSettingsResponse[]>(
    ADD_BULK_USER_SETTINGS(userId),
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

export { addBulkPreferenceSettings, type AddBulkPreferenceSettingsResponse }
