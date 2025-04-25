'use client'

import toast from 'react-hot-toast'
import * as api from '@/api/api.client'
import { GET_PROVIDER_SETTINGS_ENDPOINT } from '@/api/endpoints'
import { LevelCode } from '@/constants'
import { Appointment, Metadata } from '@/types'
import { getVisitSequence } from '../utils'

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
  userId: string,
): Promise<api.ActionResult<string | undefined>> => {
  const visitSequence = getVisitSequence(appointment)
  const name = `${appointment.visitTypeCode}_${visitSequence}_${appointment.visitMedium}`
  const response = await api.POST<UserSetting[]>(
    GET_PROVIDER_SETTINGS_ENDPOINT,
    {
      isHierarchicalQuery: true,
      categoryValue: 'ProviderDefaults',
      settingStatusCode: 'Active',
      levelCodes: [LevelCode.User, LevelCode.System],
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
