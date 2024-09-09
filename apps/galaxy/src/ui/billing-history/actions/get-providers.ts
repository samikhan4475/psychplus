'use server'

import * as api from '@/api'
import { StaffResource } from '@/types'
import { transformInOption } from '../transform'
import { SelectOptionType } from '../types'

const getProvidersAction = async (): Promise<
  api.ActionResult<SelectOptionType[]>
> => {
  const result = await api.POST<StaffResource[]>(api.GET_PROVIDERS_ENDPOINT, {
    roleCodes: ['1'],
  })

  if (result.state === 'error') {
    return {
      state: 'error',
      error: result.error,
    }
  }

  return {
    state: 'success',
    data: transformInOption(result.data, 'legalName', 'id', true, [
      'firstName',
      'lastName',
    ]),
  }
}

export { getProvidersAction }
