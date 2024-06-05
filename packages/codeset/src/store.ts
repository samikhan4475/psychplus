import { type StateCreator, type StoreApi, type UseBoundStore } from 'zustand'
import { CodeSet, CodeSetIndex, MetaDataCodeSet } from './types'

interface CodeSetState {
  codeSets: CodeSet[]
  metaDataCodeSets: MetaDataCodeSet[]
  codeSetIndex: CodeSetIndex
  setCodeSets: (codes: CodeSet[]) => void
  setMetaDataCodeSets: (codes: MetaDataCodeSet[]) => void
}

type CodeSetStoreType = UseBoundStore<StoreApi<CodeSetState>>

const createCodeSetStore: StateCreator<CodeSetState> = (set, get) => ({
  codeSets: [],
  metaDataCodeSets: [],
  codeSetIndex: {},
  setCodeSets: (codeSets) => {
    set({
      codeSets,
      codeSetIndex: createCodeSetIndex(codeSets),
    })
  },
  setMetaDataCodeSets(codes) {
    set({
      metaDataCodeSets: codes,
    })
  },
})

const createCodeSetIndex = (codeSets: CodeSet[]) =>
  codeSets.reduce(
    (acc, codeSet) => ({
      ...acc,
      [codeSet.code]: codeSet.codes,
    }),
    {} as CodeSetIndex,
  )

export { createCodeSetStore, type CodeSetStoreType, type CodeSetState }
