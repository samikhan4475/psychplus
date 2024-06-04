import { handleRequest } from '@psychplus/utils/api'
import { API_URL } from '@psychplus/utils/constants'
import { createHeaders } from '@psychplus/utils/server'
import { FunctionalCognitive, FunctionalCognitivePayload } from '.'

const getFunctionalCognitives = (): Promise<FunctionalCognitive[]> =>
  handleRequest(
    fetch(`${API_URL}/api/functionalcognitives/actions/search`, {
      method: 'POST',
      body: JSON.stringify({
        recordStatusList: ['Active'],
      }),
      cache: 'no-store',
      headers: createHeaders(),
    }),
  )

const updateFunctionalCognitive = (
  functionalCognitiveId: string,
  payload: FunctionalCognitive,
): Promise<FunctionalCognitive> =>
  handleRequest(
    fetch(`${API_URL}/api/functionalcognitives/${functionalCognitiveId}`, {
      method: 'PUT',
      body: JSON.stringify(payload),
      cache: 'no-store',
      headers: createHeaders(),
    }),
  )

const deleteFunctionalCognitive = (
  functionalCognitiveIdId: string,
): Promise<void> =>
  handleRequest(
    fetch(`${API_URL}/api/functionalcognitives/${functionalCognitiveIdId}`, {
      method: 'DELETE',
      body: JSON.stringify({}),
      cache: 'no-store',
      headers: createHeaders(),
    }),
  )

const createFunctionalCognitives = ({
  payload,
}: FunctionalCognitivePayload): Promise<FunctionalCognitive> => {
  const cleanData = Object.fromEntries(
    Object.entries(payload).filter(
      ([, value]) => value !== '' && value !== null && value !== undefined,
    ),
  )
  return handleRequest(
    fetch(`${API_URL}/api/functionalcognitives`, {
      method: 'POST',
      body: JSON.stringify(cleanData),
      cache: 'no-store',
      headers: createHeaders(),
    }),
  )
}

export {
  getFunctionalCognitives,
  updateFunctionalCognitive,
  createFunctionalCognitives,
  deleteFunctionalCognitive,
}
