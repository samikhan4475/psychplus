'use client'

import toast from 'react-hot-toast'
import { GET_PROVIDER_SETTINGS_ENDPOINT } from '@/api/endpoints'
import * as api from '@/api/api.client'
import { Appointment, Metadata } from '@/types'

interface UserSetting {
  id: string
  metadata: Metadata
  settingStatusCode: string
  levelCode: string
  categoryCode: string
  categoryValue: string
  name: string
  content: string
}

const getProviderDefaultDuration = async (
  appointment: Appointment,
): Promise<api.ActionResult<string | undefined>> => {
  const userId = appointment.providerId
  const name = `${appointment.visitTypeCode}_${appointment.visitSequence}_${appointment.visitMedium}`
  const response = await api.POST<UserSetting[]>(
    GET_PROVIDER_SETTINGS_ENDPOINT,
    {
      categoryValue: 'ProviderDefaults',
      settingStatusCode: 'Active',
      levelCodes: ['System'],
      name,
      userId,
    },
  )
  if (response.state === 'error') {
    toast.error(response.error || 'Failed to retrieve user settings')
    return {
      state: 'error',
      error: response.error,
    }
  }
  return {
    state: 'success',
    data: response.data[0]?.content,
  }
}

export { getProviderDefaultDuration }
