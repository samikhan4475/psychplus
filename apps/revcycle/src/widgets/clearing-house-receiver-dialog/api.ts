import { handleRequest } from '@psychplus/utils/api'
import { createHeaders } from '@psychplus/utils/client'
import { ClearingHouseReceiver } from './types'

const createClearingHouseReceiver = (
  payload: ClearingHouseReceiver,
): Promise<ClearingHouseReceiver> =>
  handleRequest(
    fetch(`/api/clearinghousereceivers`, {
      method: 'POST',
      body: JSON.stringify(payload),
      cache: 'no-store',
      headers: createHeaders(),
    }),
  )

const updateClearingHouseReceiver = (
  payload: ClearingHouseReceiver,
  id: string,
): Promise<ClearingHouseReceiver> =>
  handleRequest(
    fetch(`/api/clearinghousereceivers/${id}`, {
      method: 'PUT',
      body: JSON.stringify(payload),
      cache: 'no-store',
      headers: createHeaders(),
    }),
  )

export { createClearingHouseReceiver, updateClearingHouseReceiver }
