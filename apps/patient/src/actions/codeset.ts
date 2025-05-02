'use server'

import type { CodesetCache } from '@psychplus-v2/types'
import { getCodesets } from '@/api'

const getCodeSetsAction = async (names: string[]): Promise<CodesetCache> =>
  await getCodesets(names)

export { getCodeSetsAction }
