import { handleRequest } from '@psychplus/utils/api'
import { API_URL } from '@psychplus/utils/constants'
import { createHeaders } from '@psychplus/utils/server'
import { AuthorityCodeSets, type Location } from './types'
import { handleMockRequest } from './utils'

const getLocations = (): Promise<Location[]> => handleMockRequest()

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

export { getLocations, getUsStatesCodeSets }
