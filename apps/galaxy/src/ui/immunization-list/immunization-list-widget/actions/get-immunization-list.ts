'use server'

import * as api from '@/api'
import {  Sort } from '@/types'
import { IMMUNIZATION_TABLE_PAGE_SIZE } from '../constant'
import { ImmunizationPayload, ImmunizationResponseList,ImmunizationDataResponse } from '../types'

interface GetImmunizationListActionProps {
  appointmentId: string
  payload?: ImmunizationPayload
  page?: number
  limit?: number
  sort?: Sort
}

const getImmunizationListAction = async ({
  appointmentId,
  payload,
  page = 1,
  limit = IMMUNIZATION_TABLE_PAGE_SIZE,
  sort,
}: GetImmunizationListActionProps): Promise<
  api.ActionResult<ImmunizationResponseList>
> => {
  const url = new URL(api.GET_IMMUNIZATION_LIST(appointmentId))
  const offset = (page - 1) * limit

  url.searchParams.append('limit', String(limit))
  url.searchParams.append('offset', String(offset))

  if (sort) {
    url.searchParams.append('orderBy', `${sort.column} ${sort.direction}`)
  }
  const response = await api.POST<ImmunizationDataResponse[]>(`${url}`, {
    ...payload,
    ResourceStatusList: ['Active'],
  })

  if (response.state === 'error') {
    return {
      state: 'error',
      error: response.error,
    }
  }
  return {
    state: 'success',
    data: {
      immunizationList: response.data,
      total: Number(response.headers.get('psychplus-totalresourcecount')),
    },
  }
}

export { getImmunizationListAction }
