import * as api from '@/api'
import { State } from '@/types'

const getUsStatesAction = async (): Promise<State[]> => {
  const response = await api.GET<State[]>(api.GET_US_STATES_ENDPOINT)

  if (response.state === 'error') {
    throw new Error(response.error)
  }

  return response.data.filter((v) => v.stateCode)
}

export { getUsStatesAction }
