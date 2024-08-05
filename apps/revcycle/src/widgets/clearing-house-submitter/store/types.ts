import { CodeSetState } from '@psychplus/codeset'
import { PracticeList, RaceAndEthnicityCodeSet, ReceiverItem } from '../components/types'

interface SubmitterSetState extends CodeSetState {
  stateList: RaceAndEthnicityCodeSet,
  citiesList: RaceAndEthnicityCodeSet,
  practiceList: PracticeList[],
  receiverList: ReceiverItem[],
  setStateList:(stateList: any) => void,
  setCitiesList:(stateList: any) => void,
  setPracticeList:(stateList: any) => void,
  setReceiverList:(receiverList: any) => void,
}

export type { SubmitterSetState }
