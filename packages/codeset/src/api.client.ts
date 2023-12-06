import { handleRequest } from '@psychplus/utils/api'
import { forwardQuery } from '@psychplus/utils/client'
import { type Code, type CodeSet } from './types'

const getCodeSets = async (): Promise<CodeSet[]> =>
  handleRequest(fetch(forwardQuery(`/api/metadata/codesets`)))

const addCodeSet = async (
  reqBody: Code,
  codesetCode: string,
): Promise<CodeSet> => {
  return handleRequest(
    fetch(forwardQuery(`/api/metadata/codesets/${codesetCode}/codes/`), {
      method: 'POST',
      body: JSON.stringify(reqBody),
    }),
  )
}

const editCodeSet = async (
  reqBody: Code,
  codesetCode: string,
  codeTypeId: string,
): Promise<CodeSet> => {
  return handleRequest(
    fetch(
      forwardQuery(`/api/metadata/codesets/${codesetCode}/codes/${codeTypeId}`),
      {
        method: 'PUT',
        body: JSON.stringify(reqBody),
      },
    ),
  )
}

export { getCodeSets, addCodeSet, editCodeSet }
