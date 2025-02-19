'use server'

import * as api from '@/api'
import { VACATION_LIST_TABLE_PAGE_SIZE } from '../constant'
import { transformInVacations } from '../transform'
import { GetVacationsListParams, VacationTime } from '../types'

const defaultPayload = {
  isIncludeMetadataResourceChangeControl: true,
  isIncludeMetadataResourceIds: true,
  isIncludeMetadataResourceStatus: true,
}
const getVacationTimeList = async ({
  formValues,
  sort,
  page = 1,
}: GetVacationsListParams): Promise<api.ActionResult<VacationTime[]>> => {
  const offset = (page - 1) * VACATION_LIST_TABLE_PAGE_SIZE
  const url = new URL(api.GET_STAFF_VACATION_ENDPOINT)
  url.searchParams.append('limit', String(VACATION_LIST_TABLE_PAGE_SIZE))
  url.searchParams.append('offset', String(offset))
  if (sort) {
    url.searchParams.append('orderBy', `${sort.column} ${sort.direction}`)
  }
  const response = await api.POST<VacationTime[]>(url?.toString(), {
    ...defaultPayload,
    ...formValues,
  })
  if (response.state === 'error') {
    return {
      state: 'error',
      error: response.error,
    }
  }
  return {
    state: 'success',
    data: transformInVacations(response.data),
    total: Number(response.headers.get('psychplus-totalresourcecount')),
  }
}

export { getVacationTimeList }
