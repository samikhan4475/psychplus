import { cache } from 'react'
import { handleRequest } from '@psychplus/utils/api'
import { API_URL } from '@psychplus/utils/constants'
import { createHeaders } from '@psychplus/utils/server'
import { RaceAndEthnicityCodeSet } from './types'

const getUsStatesCodeSets = (): Promise<RaceAndEthnicityCodeSet> => {
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

const getUsStatesCodeSetsCached = cache(getUsStatesCodeSets)

export { getUsStatesCodeSetsCached as getUsStatesCodeSets }
