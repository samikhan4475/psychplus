import { createHeaders } from '@psychplus/utils/client'

const getSubmitters = (
  offset = 0,
  limit = 0,
  body = {}
) => fetch(
  `/revcycle/api/clearinghousesubmitters/actions/search?offset=${offset}&limit=${limit}`, {
  headers: createHeaders(),
  method: 'POST',
  body: JSON.stringify(body),
},
)

const getReceivers = (
  offset = 0,
  limit = 0,
  body = {}
) => fetch(
  `/revcycle/api/clearinghousereceivers/actions/search?offset=${offset}&limit=${limit}`, {
  headers: createHeaders(),
  method: 'POST',
  body: JSON.stringify(body),
},
)

const saveSubmitter = (
  body = {}
) => fetch(
  `/revcycle/api/clearinghousesubmitters`, {
  headers: createHeaders(),
  method: 'POST',
  body: JSON.stringify(body),
},
)

const updateSubmitter = (
  id: string | null | undefined,
  body = {},
) => fetch(
  `/revcycle/api/clearinghousesubmitters${id}`, {
  headers: createHeaders(),
  method: 'PUT',
  body: JSON.stringify(body),
},
)

const deleteSubmitter = (
  id: string | null | undefined
) => fetch(
  `/revcycle/api/clearinghousesubmitters/${id}`, {
  headers: createHeaders(),
  method: 'Delete',
},
)

export { getSubmitters, getReceivers, saveSubmitter, updateSubmitter, deleteSubmitter }
