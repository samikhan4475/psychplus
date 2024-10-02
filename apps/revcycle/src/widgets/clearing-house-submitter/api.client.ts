import { handleRequest } from '@psychplus/utils/api'
import { createHeaders } from '@psychplus/utils/client'
import {
  PracticeList,
  RaceAndEthnicityCodeSet,
  ReceiverItem,
  SubmitterItem,
} from './components/types'

const defaultPayloadPracticeList = {
  isIncludeMetadataResourceChangeControl: true,
  isIncludeMetadataResourceIds: true,
  isIncludeMetadataResourceStatus: true,
  recordStatuses: ['Active'],
}

const getSubmittersData = async (
  offset = 0,
  limit = 0,
  body = {},
): Promise<SubmitterItem[]> =>
  handleRequest(
    fetch(
      `/revcycle/api/clearinghousesubmitters/actions/search?offset=${offset}&limit=${limit}`,
      {
        headers: createHeaders(),
        method: 'POST',
        body: JSON.stringify(body),
      },
    ),
  )

const getClearingHouseReceiversData = async (
  offset = 0,
  limit = 0,
  body = {},
): Promise<ReceiverItem[]> =>
  handleRequest(
    fetch(
      `/revcycle/api/clearinghousereceivers/actions/search?offset=${offset}&limit=${limit}`,
      {
        headers: createHeaders(),
        method: 'POST',
        body: JSON.stringify(body),
      },
    ),
  )

const addSubmitterRecord = async (body = {}) =>
  handleRequest(
    fetch(`/revcycle/api/clearinghousesubmitters`, {
      headers: createHeaders(),
      method: 'POST',
      body: JSON.stringify(body),
    }),
  )

const updateSubmitterRecord = async (
  id: string | null | undefined,
  body = {},
) =>
  handleRequest(
    fetch(`/revcycle/api/clearinghousesubmitters/${id}`, {
      headers: createHeaders(),
      method: 'PUT',
      body: JSON.stringify(body),
    }),
  )

const deleteSubmitterRecord = async (id: string | null | undefined) =>
  handleRequest(
    fetch(`/revcycle/api/clearinghousesubmitters/${id}`, {
      headers: createHeaders(),
      method: 'DELETE',
    }),
  )

const getClearingHouseSubmitterPracticeList = (): Promise<PracticeList[]> =>
  handleRequest(
    fetch(`/revcycle/api/practices/actions/search`, {
      headers: createHeaders(),
      method: 'POST',
      body: JSON.stringify(defaultPayloadPracticeList),
    }),
  )

const getUsStatesCodeSets = async (): Promise<RaceAndEthnicityCodeSet> => {
  return handleRequest(
    fetch(
      '/revcycle/api/codeset/authorities/psychpluspublic/codesets/UsStates',
      {
        cache: 'no-store',
        headers: createHeaders(),
      },
    ),
  )
}

const getUsCitiesCodeSets = async (): Promise<RaceAndEthnicityCodeSet> => {
  return handleRequest(
    fetch(
      '/revcycle/api/codeset/authorities/PsychPlusPublic/codesets/UsCities?includeExtraDetails=false&groupingCodeStartsWith=AL',
      {
        cache: 'no-store',
        headers: createHeaders(),
      },
    ),
  )
}

export {
  getSubmittersData,
  getClearingHouseReceiversData,
  addSubmitterRecord,
  updateSubmitterRecord,
  deleteSubmitterRecord,
  getClearingHouseSubmitterPracticeList,
  getUsStatesCodeSets,
  getUsCitiesCodeSets,
}
