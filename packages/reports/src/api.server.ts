import { Parameter } from '@psychplus/codeset'
import { handleRequest } from '@psychplus/utils/api'
import { API_URL } from '@psychplus/utils/constants'
import { createHeaders } from '@psychplus/utils/server'
import { Template } from './types'

const searchTemplates = (): Promise<Template[]> => {
  const body = {
    recordStatuses: ['Active', 'Deleted'],
    isIncludeMetadataResourceChangeControl: true,
    isIncludeMetadataResourceStatus: true,
    isIncludeParameter: true,
    isIncludeReportFile: false,
  }

  return handleRequest(
    fetch(
      `${API_URL}/api/reporting/templates/actions/search?offset=0&limit=0&orderBy=displayname%20asc`,
      {
        cache: 'no-store',
        method: 'POST',
        headers: createHeaders(),
        body: JSON.stringify(body),
      },
    ),
  )
}

const getParameterTypeCodesets = (): Promise<Parameter> =>
  handleRequest(
    fetch(
      `${API_URL}/api/codeset/authorities/PsychPlusPublic/codesets/ReportParameterType`,
      {
        cache: 'no-store',
        headers: createHeaders(),
      },
    ),
  )

export { searchTemplates, getParameterTypeCodesets }
