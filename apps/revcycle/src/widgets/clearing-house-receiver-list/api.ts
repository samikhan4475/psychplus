import { handleRequest } from '@psychplus/utils/api'
import { createHeaders } from '@psychplus/utils/client'
import { ClearingHouseReceiver } from './types'

interface ClearingHouseReceiverPayload {
  receiverIds: string[]
  clearingHouseName?: string
  address1?: string
  address2?: string
  zip?: string
  phone?: string
  fax?: string
  email?: string
  receiverId?: string
  receiverName?: string
}

const getClearingHouseReceiverList = (
  payload: ClearingHouseReceiverPayload,
): Promise<ClearingHouseReceiver[]> =>
  handleRequest(
    fetch(`/revcycle/api/clearinghousereceivers/actions/search`, {
      method: 'POST',
      body: JSON.stringify(payload),
      cache: 'no-store',
      headers: createHeaders(),
    }),
  )

const deleteClearingHouseReceiver = (
  id: string,
): Promise<ClearingHouseReceiver> =>
  handleRequest(
    fetch(`/revcycle/api/clearinghousereceivers/${id}`, {
      method: 'DELETE',
      cache: 'no-store',
      headers: createHeaders(),
    }),
  )

export { getClearingHouseReceiverList, deleteClearingHouseReceiver }
