import * as api from '@/api'
import { LocationService } from '../types'

const getServiceStatusHistory = async (): Promise<
  api.ActionResult<LocationService[]>
> => {
  const response = await new Promise<api.NetworkResult<LocationService[]>>(
    (resolve) => {
      setTimeout(() => {
        resolve({ state: 'success', data } as api.NetworkResult<
          LocationService[]
        >)
      }, 2000)
    },
  )

  if (response.state === 'error') {
    return {
      state: 'error',
      error: response.error,
    }
  }

  return {
    state: 'success',
    data: response.data,
  }
}
const data: LocationService[] = [...Array(3)].map((item) => ({
  locationName: 'John Smith',
  state: '2023-01-10T00:00:00Z',
  status: 'Active',
  ...item,
}))
export { getServiceStatusHistory }
