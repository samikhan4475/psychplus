import { cache } from 'react'
import { handleRequest } from '@psychplus/utils/api'
import { APP_HOST } from '@psychplus/utils/constants'
import { forwardQuery } from '@psychplus/utils/server'
import { type CodeSet } from './types'

const getCodeSets = async (): Promise<CodeSet[]> =>
  handleRequest(
    fetch(forwardQuery(`${APP_HOST}/api/metadata/codesets`), {
      next: {
        revalidate: 3600,
        tags: ['codesets'],
      },
    }),
  )

const getCodeSetsCached = cache(getCodeSets)

export { getCodeSetsCached as getCodeSets }
