import { cache } from 'react'
import { API_URL } from '@psychplus/env'
import type { TokenParams } from '@psychplus/types'
import { createCommonHeaders } from '@psychplus/api/server'
import type { CodeSet } from '../../types'

const getCodeSets = async ({ token }: Partial<TokenParams> = {}): Promise<
  CodeSet[]
> => {
  const response = await fetch(`${API_URL}/api/metadata/codesets`, {
    headers: createCommonHeaders({ token }),
    next: {
      revalidate: 3600,
    },
  })

  if (!response.ok) {
    throw new Error()
  }

  return response.json()
}

const getCodeSetsCached = cache(getCodeSets)

export { getCodeSetsCached as getCodeSets }
