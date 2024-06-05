import { CodeSetState } from '@psychplus/codeset'
import { MetaDataCodeSet } from '../types'

interface CodingSetPOSState extends CodeSetState {
  codingPosList: MetaDataCodeSet[]
}

export type { CodingSetPOSState }
