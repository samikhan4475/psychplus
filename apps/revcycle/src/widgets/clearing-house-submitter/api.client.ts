import { handleRequest } from '@psychplus/utils/api'
import { createHeaders } from '@psychplus/utils/client';
import { PracticeList, SubmitterItem, ReceiverItem, RaceAndEthnicityCodeSet } from './components/types';


const getSubmittersData = async (
  offset = 0,
  limit = 0,
  body = {}
): Promise<SubmitterItem[]> =>
  handleRequest(
    fetch(`/revcycle/api/clearinghousesubmitters/actions/search?offset=${offset}&limit=${limit}`, {
      headers: createHeaders(),
      method: 'POST',
      body: JSON.stringify(body),
    })
  );

const getClearingHouseReceiversData = async (
  offset = 0,
  limit = 0,
  body = {}
): Promise<ReceiverItem[]> =>
  handleRequest(
    fetch(`/revcycle/api/clearinghousereceivers/actions/search?offset=${offset}&limit=${limit}`, {
      headers: createHeaders(),
      method: 'POST',
      body: JSON.stringify(body),
    })
  )

const addSubmitterRecord = async (body = {}) =>
  handleRequest(
    fetch(`/revcycle/api/clearinghousesubmitters`, {
      headers: createHeaders(),
      method: 'POST',
      body: JSON.stringify(body),
    })
  );


const updateSubmitterRecord = async (id: string | null | undefined, body = {}) =>
  handleRequest(
    fetch(`/revcycle/api/clearinghousesubmitters/${id}`, {
      headers: createHeaders(),
      method: 'PUT',
      body: JSON.stringify(body),
    })
  );

const deleteSubmitterRecord = async (id: string | null | undefined) =>
  handleRequest(
    fetch(`/revcycle/api/clearinghousesubmitters/${id}`, {
      headers: createHeaders(),
      method: 'DELETE',
    })
  );

const getClearingHouseSubmitterPracticeList = (): Promise<PracticeList[]> => {
  return Promise.resolve([
    {
      id: "d3f4e8a1-7c4e-4b98-8d5e-3a8dbe2c5d39",
      name: "PSYCHIATRY OF TEXAS PLLC"
    },
    {
      id: "a2c9e9f7-5a4e-4126-a37d-7f6f614b4c57",
      name: "PSYCHIATRY OF HOUSTON",
    }
  ]);
};

const getUsStatesCodeSets = async (): Promise<RaceAndEthnicityCodeSet> => {
  return handleRequest(
    fetch('/revcycle/api/codeset/authorities/psychpluspublic/codesets/UsStates', {
      cache: 'no-store',
      headers: createHeaders(),
    })
  )
}

const getUsCitiesCodeSets = async (): Promise<RaceAndEthnicityCodeSet> => {
  return handleRequest(
    fetch('/revcycle/api/codeset/authorities/PsychPlusPublic/codesets/UsCities?includeExtraDetails=false&groupingCodeStartsWith=AL', {
      cache: 'no-store',
      headers: createHeaders(),
    })
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
  getUsCitiesCodeSets
};
