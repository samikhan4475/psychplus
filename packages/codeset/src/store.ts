import type { StateCreator, StoreApi, UseBoundStore } from 'zustand'
import { CodeSet, CodeSetIndex } from './types'

interface CodeSetState {
  codeSets: CodeSet[]
  codeSetIndex: CodeSetIndex
  setCodeSets: (codes: CodeSet[]) => void
}

type CodeSetStoreType = UseBoundStore<StoreApi<CodeSetState>>

const createCodeSetStore: StateCreator<CodeSetState> = (set) => ({
  codeSets: [],
  codeSetIndex: {},
  setCodeSets: (codeSets) => {
    set({
      codeSets,
      codeSetIndex: createCodeSetIndex(codeSets),
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
