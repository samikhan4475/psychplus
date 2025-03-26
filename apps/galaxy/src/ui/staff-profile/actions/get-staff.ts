'use server'

import * as api from '@/api'
import { SelectOptionType } from '@/types'
import type { Staff } from '../../staff-management/types'
import { transformIn } from '../data'
import { StaffUpdatePayload } from '../types'

interface getStaffActionParams {
  staffId: string
  languageOptions: SelectOptionType[]
}

const getStaffAction = async ({
  staffId,
  languageOptions,
}: getStaffActionParams): Promise<api.ActionResult<StaffUpdatePayload>> => {
  const url = new URL(api.DELETE_STAFF_ENDPOINT(staffId))
  url.searchParams.append('isIncludeOrganization', 'true')
  url.searchParams.append('isIncludePractice', 'true')
  const response = await api.GET<Staff>(`${url}`)
  if (response.state === 'error') {
    return {
      state: 'error',
      error: response.error,
    }
  }

  return {
    state: 'success',
    data: transformIn(response.data, languageOptions),
  }
}

export { getStaffAction }
