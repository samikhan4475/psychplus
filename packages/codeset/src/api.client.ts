import { cache } from 'react'
import { handleRequest } from '@psychplus/utils/api'
import { createHeaders } from '@psychplus/utils/client'
import type {
  AuthorityCodeSet,
  Code,
  CodeSet,
  IcdCodes,
  IcdFilters,
  Snomed,
} from './types'

const getCodeSets = async (): Promise<CodeSet[]> =>
  handleRequest(
    fetch(`/revcycle/api/metadata/codesets`, {
      headers: createHeaders(),
    }),
  )

const getCodeSet = async (name: string): Promise<CodeSet> =>
  handleRequest(
    fetch(`/api/metadata/codesets/${name}`, {
      headers: createHeaders(),
    }),
  )

const addCodeSet = async (req: Code, name: string): Promise<CodeSet> =>
  handleRequest(
    fetch(`/api/metadata/codesets/${name}/codes/`, {
      method: 'POST',
      body: JSON.stringify(req),
      headers: createHeaders(),
    }),
  )

const editCodeSet = async (
  req: Code,
  name: string,
  code: string,
): Promise<CodeSet> =>
  handleRequest(
    fetch(`/api/metadata/codesets/${name}/codes/${code}`, {
      method: 'PUT',
      body: JSON.stringify(req),
      headers: createHeaders(),
    }),
  )

const getUsStates = async (): Promise<AuthorityCodeSet> =>
  handleRequest(
    fetch(`/api/codeset/authorities/PsychPlusPublic/codesets/UsStates`, {
      headers: createHeaders(),
    }),
  )

const getIcdCodes = (payload?: IcdFilters): Promise<IcdCodes[]> =>
  handleRequest(
    fetch(
      '/galaxy/api/metadata/icd10codes/actions/search?offset=0&limit=0&orderBy=HcpcsCode%20asc',
      {
        method: 'POST',
        body: JSON.stringify(payload),
        cache: 'no-store',
        headers: createHeaders(),
      },
    ),
  )

const getSnomedCodes = (payload?: IcdFilters): Promise<Snomed> =>
  handleRequest(
    fetch(
      `/galaxy/api/codeset/authorities/IHTSDO/codesets/SNOMED-CT?${payload?.codeOrDescription}&includeExtraDetails=false&offset=0&orderBy=displayName%20asc`,
      {
        method: 'GET',
        cache: 'no-store',
        headers: createHeaders(),
      },
    ),
  )

const getIcdCodesCached = cache(getIcdCodes)
const getSnomedCodesCached = cache(getSnomedCodes)

export {
  getCodeSets,
  getCodeSet,
  addCodeSet,
  editCodeSet,
  getUsStates,
  getIcdCodesCached as getIcdCodes,
  getSnomedCodesCached as getSnomedCodes,
}
