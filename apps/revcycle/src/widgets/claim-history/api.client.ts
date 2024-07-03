import { handleRequest } from '@psychplus/utils/api'
import { createHeaders } from '@psychplus/utils/client'

const fetchClaimHistory = (body = {}) =>
  handleRequest(
    fetch(`/revcycle/api/claims/history?offset=0&limit=0`, {
      headers: createHeaders(),
      method: 'POST',
      body: JSON.stringify(body),
    }),
  )

export { fetchClaimHistory }
