'use server'
import * as api from '../../../api';
import {FetchLocationsParams, LocationType } from './types';
import { LOCATION_LIST_TABLE_PAGE_SIZE } from './constant';

const defaultPayload = {};

const getLocationList = async ({
  payload,
  page = 1,
  sort,
}: FetchLocationsParams): Promise<api.ActionResult<{ locationList: LocationType[]; totalCount: number }>> => {
  const offset = (page - 1) * LOCATION_LIST_TABLE_PAGE_SIZE

  const url = new URL(api.LOCATION_ENDPOINT)
  url.searchParams.append('limit', String(LOCATION_LIST_TABLE_PAGE_SIZE))
  url.searchParams.append('offset', String(offset))

  if (sort) {
    url.searchParams.append('orderBy', `${sort.column} ${sort.direction}`)
  }

  const response = await api.POST<LocationType[]>(`${url}`, {
    ...defaultPayload,
    ...payload,
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
      locationList: response.data,
      totalCount: Number(response.headers.get('psychplus-totalresourcecount')),
    },
  }
}

export { getLocationList };
