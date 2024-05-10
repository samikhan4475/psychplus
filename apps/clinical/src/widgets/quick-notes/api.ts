import { handleRequest } from '@psychplus/utils/api'
import { createHeaders } from '@psychplus/utils/client'

const getQuickNotesContentData = (request: string) =>
  handleRequest(
    fetch(
      `/api/codeset/authorities/PsychPlusPublic/codesets/${request}?includeExtraDetails=true`,
      {
        method: 'POST',
        body: JSON.stringify(request),
        headers: createHeaders(),
      },
    ),
  )

export { getQuickNotesContentData }
