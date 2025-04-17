'use server'

import * as api from '@/api'
import { Practice, SelectOptionType } from '@/types'

interface Payload {
  organizationId?: string
  practiceId?: string
  includeUsers?: boolean
}

interface GetListParams {
  payload?: Payload
}

const defaultPayload = {
  isIncludeMetadataResourceChangeControl: true,
  isIncludeMetadataResourceIds: true,
  isIncludeMetadataResourceStatus: true,
}

const getAllPracticesOptionsListAction = async ({
  payload,
}: GetListParams): Promise<api.ActionResult<SelectOptionType[]>> => {
  const url = new URL(api.GET_PRACTICES_ENDPOINT)

  const response = await api.POST<Practice[]>(`${url}`, {
    ...defaultPayload,
    ...payload,
  })

  if (response.state === 'error') {
    return {
      state: 'error',
      error: response.error,
    }
  }

  let transformedData: SelectOptionType[] = []
  transformedData.push({
    value: '',
    label: 'All',
  })
  if (payload?.includeUsers) {
    const practice = response.data[0]?.users
    transformedData = practice?.map((user) => ({
      value: `${user.id}`,
      label: `${user.legalName.firstName} ${user.legalName.lastName}`,
    })) as SelectOptionType[]
  } else {
    transformedData = response.data.map((data) => ({
      value: data.id,
      label: data.shortName,
    }))
  }

  return {
    state: 'success',
    data: transformedData,
  }
}

export { getAllPracticesOptionsListAction }
