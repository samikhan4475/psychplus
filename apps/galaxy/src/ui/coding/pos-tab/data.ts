import { SharedCode } from '@/types'
import { PosList } from '../types'

const transformIn = (data: SharedCode[]): PosList[] =>
  data
    ?.map((code) => ({
      code:
        code.attributes?.[0].name === 'SubmissionCode'
          ? code.attributes?.[0]?.value ?? ''
          : code.attributes?.[1]?.value ?? '',
      description: code.display,
    }))
    .sort((a, b) => Number(a.code) - Number(b.code))

export { transformIn }
