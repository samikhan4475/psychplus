import { cache } from 'react'
import { APP_HOST } from '@psychplus/utils/constants'
import { forwardQuery } from '@psychplus/utils/server'
import { type CodeSet } from './types'

const getCodeSets = async (): Promise<CodeSet[]> =>
  fetch(forwardQuery(`${APP_HOST}/api/metadata/codesets`), {
    next: {
      revalidate: 3600,
      tags: ['codesets'],
    },
  }).then((res) => res.json())

const getCodeSetsCached = cache(getCodeSets)

export { getCodeSetsCached as getCodeSets }
