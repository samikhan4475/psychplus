'use server'

import * as api from '@/api'

interface ModifierCode {
  code: string
  displayName: string
}

interface ModifiersResponse {
  codes: ModifierCode[]
}

interface GetServiceModifiersResponse {
  serviceModifierData: ModifierCode[]
}

const getServiceModifiersCodes = async (
  value: string,
): Promise<api.ActionResult<GetServiceModifiersResponse>> => {
  const response = await api.GET<ModifiersResponse>(
    api.GET_MODIFIERS_CODES(value),
  )
  if (response.state === 'error') {
    return {
      state: 'error',
      error: response.error,
    }
  }

  return {
    state: 'success',
    data: {
      serviceModifierData: response.data.codes,
    },
  }
}

export { getServiceModifiersCodes }
