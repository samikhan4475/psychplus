import { createHeaders } from '@psychplus/utils/client'

const addCPTRecords = (offset = 0, limit = 0, body = {}) =>
  fetch(`/revcycle/api/masterfeeschedules?offset=${offset}&limit=${limit}`, {
    headers: createHeaders(),
    method: 'POST',
    body: JSON.stringify(body),
  })

const getCPTSearchedRecords = (offset = 0, limit = 0, body = {}) =>
  fetch(
    `/revcycle/api/masterfeeschedules/actions/search?offset=${offset}&limit=${limit}`,
    {
      headers: createHeaders(),
      method: 'POST',
      body: JSON.stringify(body),
    },
  )

const updateCPTRecords = (id: string, body = {}) =>
  fetch(`/revcycle/api/masterfeeschedules/${id}`, {
    headers: createHeaders(),
    method: 'PUT',
    body: JSON.stringify(body),
  })

const deleteCPTRecords = (id: string) =>
  fetch(`/revcycle/api/masterfeeschedules/${id}`, {
    headers: createHeaders(),
    method: 'DELETE',
  })

export {
  addCPTRecords,
  getCPTSearchedRecords,
  updateCPTRecords,
  deleteCPTRecords,
}
