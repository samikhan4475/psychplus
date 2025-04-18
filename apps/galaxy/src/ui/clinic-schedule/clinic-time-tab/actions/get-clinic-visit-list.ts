'use server'

import * as api from '@/api'
import { transformIn } from '../transform'
import { ClinicSchedule, GetClinicVisitListParams } from '../types'

const defaultPayload = {
  isIncludeMetadataResourceChangeControl: true,
  isIncludeMetadataResourceIds: true,
  isIncludeMetadataResourceStatus: true,
  isIncludeServices: true,
  isIncludeTeleStates: true,
  isIncludeVisitTypes: true,
  isIncludeLocation: true,
}

const getClinicVisitList = async ({
  formValues,
  staffId,
  page = 1,
}: GetClinicVisitListParams): Promise<api.ActionResult<ClinicSchedule[]>> => {
  const offset = (page - 1) * 20
  const url = new URL(api.GET_CLINIC_SCHEDULES_LIST(staffId))
  url.searchParams.append('limit', String(20))
  url.searchParams.append('offset', String(offset))
  const response = await api.POST<ClinicSchedule[]>(url.toString(), {
    ...defaultPayload,
    ...formValues,
    maxBookingsPerSlot: formValues?.maxBookingPerSlot
      ? Number(formValues.maxBookingPerSlot)
      : undefined,
    isPublicViewable: formValues?.isPublicViewable
      ? formValues.isPublicViewable === 'yes'
      : undefined,
  })

  if (response.state === 'error') {
    return {
      state: 'error',
      error: response.error,
    }
  }
  const total = Number(response.headers.get('psychplus-totalresourcecount'))

  return {
    state: 'success',
    total,
    data: transformIn(response.data),
  }
}

export { getClinicVisitList }
