import { cache } from 'react'
import { api } from '@psychplus/api'
import { API_URL } from '@psychplus/utils/constants'
import { type CodeSet } from './types'

const getCodeSets = async (): Promise<CodeSet[]> =>
  api(`${API_URL}/api/metadata/codesets`, {
    next: {
      revalidate: 3600,
    },
  })

const getCodeSetsCached = cache(getCodeSets)

export { getCodeSetsCached as getCodeSets }
