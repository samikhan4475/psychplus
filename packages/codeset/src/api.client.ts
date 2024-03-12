import { handleRequest } from '@psychplus/utils/api'
import { createHeaders } from '@psychplus/utils/client'
import type { AuthorityCodeSet, Code, CodeSet } from './types'

const getCodeSets = async (): Promise<CodeSet[]> =>
  handleRequest(
    fetch(`/api/metadata/codesets`, {
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

export { getCodeSets, getCodeSet, addCodeSet, editCodeSet, getUsStates }
