import { handleRequest } from '@psychplus/utils/api'
import { API_URL } from '@psychplus/utils/constants'
import { createHeaders } from '@psychplus/utils/server'
import { AuthorityCodeSets, AuthorityNameSpace } from './types'

const getRaceAndEthnicityCodeSets = (): Promise<AuthorityCodeSets> => {
  return handleRequest(
    fetch(
      `${API_URL}/api/codeset/authorities/cdc/codesets/PH_RaceAndEthnicity_CDC`,
      {
        cache: 'no-store',
        headers: createHeaders(),
      },
    ),
  )
}

const getUsStatesCodeSets = (): Promise<AuthorityCodeSets> => {
  return handleRequest(
    fetch(
      `${API_URL}/api/codeset/authorities/psychpluspublic/codesets/UsStates`,
      {
        cache: 'no-store',
        headers: createHeaders(),
      },
    ),
  )
}

const getDegreeCodeSets = (): Promise<AuthorityCodeSets> => {
  return handleRequest(
    fetch(
      `${API_URL}/api/codeset/authorities/HL7v2/codesets/Degree?includeExtraDetails=false`,
      {
        cache: 'no-store',
        headers: createHeaders(),
      },
    ),
  )
}

const getHl7v3CodeSets = (): Promise<AuthorityNameSpace[]> =>
  handleRequest(
    fetch(`${API_URL}/api/codeset/actions/search`, {
      cache: 'no-store',
      headers: createHeaders(),
      method: 'POST',
      body: JSON.stringify({
        isIncludeMetadataResourceChangeControl: false,
        isIncludeMetadataResourceIds: false,
        isIncludeMetadataResourceStatus: false,
        isIncludeMetadataPermissions: false,
        isIncludeCodesets: true,
        isIncludeCodes: true,
        isIncludeCodeAttributes: true,
        namespace: 'hl7v3',
      }),
    }),
  )


export {
  getRaceAndEthnicityCodeSets,
  getUsStatesCodeSets,
  getHl7v3CodeSets,
  getDegreeCodeSets,
}
