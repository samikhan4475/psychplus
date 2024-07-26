import { CodeSetState } from '@psychplus/codeset'
import { MetaDataCodeSet } from '../types'
interface CodingCPTSetState extends CodeSetState {
  feeScheduleCategoryList: MetaDataCodeSet[];
  codingPosList: MetaDataCodeSet[];
  setFeeScheduleCategoryCodeSets: (feeScheduleCategoryList: MetaDataCodeSet[]) => void;
  setCodingPosCodeSets: (codingPosList: MetaDataCodeSet[]) => void;
}

export type { CodingCPTSetState }
