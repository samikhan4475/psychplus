'use client'

import { createContext, useContext, useRef } from 'react'
import type { CodesetCache, SharedCode } from '@psychplus-v2/types'
import { useStore, type StoreApi } from 'zustand'
import { createCodesetStore, type CodesetStore } from '@/stores'

const CodesetStoreContext = createContext<StoreApi<CodesetStore> | undefined>(
  undefined,
)

interface CodesetStoreProviderProps {
  codesets: CodesetCache
}

const CodesetStoreProvider = ({
  codesets,
  children,
}: React.PropsWithChildren<CodesetStoreProviderProps>) => {
  const storeRef = useRef<StoreApi<CodesetStore>>()

  if (!storeRef.current) {
    storeRef.current = createCodesetStore(codesets)
  }

  return (
    <CodesetStoreContext.Provider value={storeRef.current}>
      {children}
    </CodesetStoreContext.Provider>
  )
}

const useCodesetStore = <T,>(selector: (store: CodesetStore) => T): T => {
  const context = useContext(CodesetStoreContext)

  if (!context) {
    throw new Error(`useCodesetStore must be use within CodesetStoreProvider`)
  }

  return useStore(context, selector)
}

const useCodesetCodes = (name: string) => {
  const codesetCache = useCodesetStore((state) => state.codesets)
  const key = name.includes('.') ? name.split('.')[1] : name
  return codesetCache[key].codes ?? []
}

const useCodeDisplay = (codeSet: string, code?: string) => {
  const codesetCache = useCodesetStore((state) => state.codesets)
  return codesetCache[codeSet].codes.find((_code) => _code.value === code)
    ?.display
}

function mapCodesetToOptions(
  codeset: SharedCode[],
): { label: string; value: string }[] {
  return codeset.map(({ display, ...rest }) => ({
    label: display,
    ...rest,
  }))
}

export {
  CodesetStoreProvider,
  useCodesetStore,
  useCodesetCodes,
  useCodeDisplay,
  mapCodesetToOptions,
}
