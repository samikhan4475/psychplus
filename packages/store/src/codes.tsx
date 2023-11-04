'use client'

import { useRef } from 'react'
import type { StateCreator, StoreApi, UseBoundStore } from 'zustand'
import type { Code, CodeSet } from '@psychplus/types'

type CodeSetIndex = { [key: string]: Code[] | undefined }

type CodeCache = { [key: string]: string }

interface CodeSetState {
  codes?: CodeSet[]
  codeIndex?: CodeSetIndex
  codeCache: CodeCache
  getCodes: () => CodeSet[]
  setCodes: (codes: CodeSet[]) => void
  getCodeDisplayName: (code: string) => string
}

type StoreType = UseBoundStore<StoreApi<CodeSetState>>

const createCodeSetStore: StateCreator<CodeSetState> = (set, get) => ({
  codeCache: {},
  getCodes: () => {
    const codes = get().codes

    if (!codes) {
      throw new Error()
    }

    return codes
  },
  setCodes: (codes) => {
    const index: CodeSetIndex = codes.reduce(
      (acc, codeSet) => ({
        ...acc,
        [codeSet.code]: codeSet.codes,
      }),
      {},
    )

    set({
      codes: codes,
      codeIndex: index,
    })
  },
  getCodeDisplayName: (code) => {
    // First check cache to see if result has already been computed.
    if (get().codeCache[code]) {
      return get().codeCache[code]
    }

    const index = get().codeIndex

    if (!index) {
      throw new Error()
    }

    const [codeSet, codeName] = code.split('.')

    const result =
      index[codeSet]?.find((codes) => codes.code === codeName)?.display ?? 'N/A'

    // Cache result of code display name lookup for more efficient future lookups.
    set({
      codeCache: {
        ...get().codeCache,
        [code]: result,
      },
    })

    return result
  },
})

const CodeSetPreloader = ({
  codes,
  store,
}: {
  codes: CodeSet[]
  store: StoreType[]
}) => {
  const loaded = useRef(false)

  if (!loaded.current) {
    loaded.current = true

    const setters = store.map((s) => s((state) => state.setCodes))
    setters.forEach((set) => set(codes))
  }

  return null
}

export { type CodeSetState, createCodeSetStore, CodeSetPreloader }
