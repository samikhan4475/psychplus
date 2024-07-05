import { handleRequest } from '@psychplus/utils/api'
import { API_URL } from '@psychplus/utils/constants'
import { createHeaders } from '@psychplus/utils/server'
import type { CarePlan, CarePlanPayload } from './types'

const getCarePlans = (): Promise<CarePlan[]> =>
  handleRequest(
    fetch(`${API_URL}/api/careplans/actions/search`, {
      method: 'POST',
      body: JSON.stringify({
        recordStatusList: ['Active'],
      }),
      cache: 'no-store',
      headers: createHeaders(),
    }),
  )

const updateCareplan = (
  payload: CarePlan,
  carePlanId?: string,
  patientId?: number,
): Promise<CarePlan[]> =>
  handleRequest(
    fetch(`${API_URL}/api/patients/${patientId}/careplans/${carePlanId}`, {
      method: 'PUT',
      body: JSON.stringify(payload),
      cache: 'no-store',
      headers: createHeaders(),
    }),
  )

const deleteCarePlan = (carePlanId?: string): Promise<void> =>
  handleRequest(
    fetch(`${API_URL}/api/careplans/${carePlanId}`, {
      method: 'DELETE',
      body: JSON.stringify({}),
      cache: 'no-store',
      headers: createHeaders(),
    }),
  )

const createCarePlan = ({
  payload,
  patientId,
}: CarePlanPayload): Promise<CarePlan> => {
  const cleanData = Object.fromEntries(
    Object.entries(payload).filter(
      ([, value]) => value !== '' && value !== null && value !== undefined,
    ),
  )
  return handleRequest(
    fetch(`${API_URL}/api/patients/${patientId}/careplans`, {
      method: 'POST',
      body: JSON.stringify(cleanData),
      cache: 'no-store',
      headers: createHeaders(),
    }),
  )
}

export { getCarePlans, updateCareplan, createCarePlan, deleteCarePlan }
