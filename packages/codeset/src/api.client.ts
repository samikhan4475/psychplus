import { cache } from 'react'
import { handleRequest } from '@psychplus/utils/api'
import { createHeaders } from '@psychplus/utils/client'
import type {
  ActiveCode,
  ActiveCodeAttribute,
  ActiveCodeSet,
  AssigningAuthorities,
  AssigningAuthority,
  AuthorityCodeSet,
  Code,
  CodeSet,
  IcdCodes,
  IcdFilters,
  NewCode,
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
const deleteCode = (request: Partial<ActiveCode>): Promise<ActiveCode> =>
  handleRequest(
    fetch(`/api/codeset/actions/search`, {
      method: 'DELETE',
      body: JSON.stringify(request),
      cache: 'no-store',
      headers: createHeaders(),
    }),
  )

const addActiveCodeSetCode = async (
  assigningAuthorityId: string,
  codesetId: string,
  body: NewCode,
): Promise<ActiveCode[]> =>
  handleRequest(
    fetch(
      `/galaxy/api/codeset/authorities/${assigningAuthorityId}/codesets/${codesetId}/codes`,
      {
        method: 'POST',
        cache: 'no-store',
        headers: createHeaders(),
        body: JSON.stringify([{ ...body }]),
      },
    ),
  )

const updateActiveCodeSet = async (
  assigningAuthorityId: string,
  codesetId: string,
  body: Partial<ActiveCodeSet>,
): Promise<ActiveCodeSet> =>
  handleRequest(
    fetch(
      `/galaxy/api/codeset/authorities/${assigningAuthorityId}/codesets/${codesetId}`,
      {
        method: 'PUT',
        cache: 'no-store',
        headers: createHeaders(),
        body: JSON.stringify(body),
      },
    ),
  )

const addActiveCodeSet = async (
  assigningAuthorityId: string,
  body: Partial<ActiveCodeSet>,
): Promise<ActiveCodeSet> =>
  handleRequest(
    fetch(`/galaxy/api/codeset/authorities/${assigningAuthorityId}/codesets`, {
      method: 'POST',
      cache: 'no-store',
      headers: createHeaders(),
      body: JSON.stringify(body),
    }),
  )

const updateActiveCode = async (
  assigningAuthorityId: string,
  codesetId: string,
  codeId: string,
  body: Partial<ActiveCode>,
): Promise<ActiveCode> =>
  handleRequest(
    fetch(
      `/galaxy/api/codeset/authorities/${assigningAuthorityId}/codesets/${codesetId}/codes/${codeId}`,
      {
        method: 'PUT',
        cache: 'no-store',
        headers: createHeaders(),
        body: JSON.stringify(body),
      },
    ),
  )

const getActiveCodeSets = async (payload = {}): Promise<AssigningAuthority[]> =>
  handleRequest(
    fetch(
      `/galaxy/api/codeset/actions/search?includeExtraDetails=true&offset=0&limit=0&orderBy=namespace%20asc`,
      {
        cache: 'no-store',
        headers: createHeaders(),
        body: JSON.stringify(payload),
        method: 'POST',
      },
    ),
  )

const addAuthority = async (
  body: AssigningAuthorities,
): Promise<AssigningAuthorities> =>
  handleRequest(
    fetch(`/galaxy/api/codeset/authorities`, {
      method: 'POST',
      cache: 'no-store',
      headers: createHeaders(),
      body: JSON.stringify(body),
    }),
  )

const getCptCodes = (payload?: IcdFilters): Promise<Snomed> =>
  handleRequest(
    fetch(
      `/galaxy/api/codeset/authorities/AMA/codesets/CPT4?${payload?.codeOrDescription}&includeExtraDetails=false&offset=0&orderBy=displayName%20asc`,
      {
        method: 'GET',
        cache: 'no-store',
        headers: createHeaders(),
      },
    ),
  )

const getActiveCodeAttributes = async (
  assigningAuthorityNamespace: string,
  codeSystemName: string,
  code: string,
): Promise<ActiveCodeAttribute[]> =>
  handleRequest(
    fetch(
      `/galaxy/api/codeset/authorities/${assigningAuthorityNamespace}/codesets/${codeSystemName}/codes/${code}/attributes?includeExtraDetails=true&recordStatus=Active`,
      {
        method: 'GET',
        cache: 'no-store',
        headers: createHeaders(),
      },
    ),
  )

const addActiveCodeAttribute = async (
  assigningAuthorityId: string,
  codesetId: string,
  codeId: string,
  body: Partial<ActiveCodeAttribute>,
): Promise<ActiveCodeAttribute[]> =>
  handleRequest(
    fetch(
      `/galaxy/api/codeset/authorities/${assigningAuthorityId}/codesets/${codesetId}/codes/${codeId}/attributes`,
      {
        method: 'POST',
        cache: 'no-store',
        headers: createHeaders(),
        body: JSON.stringify([body]),
      },
    ),
  )

const updateActiveCodeAttribute = async (
  assigningAuthorityId: string,
  codesetId: string,
  codeId: string,
  attributeId: string,
  body: Partial<ActiveCodeAttribute>,
): Promise<ActiveCodeAttribute> =>
  handleRequest(
    fetch(
      `/galaxy/api/codeset/authorities/${assigningAuthorityId}/codesets/${codesetId}/codes/${codeId}/attributes/${attributeId}`,
      {
        method: 'PUT',
        cache: 'no-store',
        headers: createHeaders(),
        body: JSON.stringify(body),
      },
    ),
  )

const getIcdCodesCached = cache(getIcdCodes)
const getSnomedCodesCached = cache(getSnomedCodes)
const getActiveCodeSetsCached = cache(getActiveCodeSets)
const getActiveCodeAttributesCached = cache(getActiveCodeAttributes)
const getCptCodesCached = cache(getCptCodes)

export {
  getCodeSets,
  getCodeSet,
  addCodeSet,
  editCodeSet,
  getUsStates,
  getIcdCodesCached as getIcdCodes,
  getSnomedCodesCached as getSnomedCodes,
  getActiveCodeSetsCached as getActiveCodeSets,
  getActiveCodeAttributesCached as getActiveCodeAttributes,
  addActiveCodeAttribute,
  deleteCode,
  addActiveCodeSetCode,
  updateActiveCodeSet,
  updateActiveCode,
  addActiveCodeSet,
  addAuthority,
  updateActiveCodeAttribute,
  getCptCodesCached as getCptCodes,
}
