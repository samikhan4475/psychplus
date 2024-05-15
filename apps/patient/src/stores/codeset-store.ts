import type { CodesetCache } from '@psychplus-v2/types'
import { createStore } from 'zustand/vanilla'

interface CodesetStore {
  codesets: CodesetCache
}

const createCodesetStore = (codesets: CodesetCache) =>
  createStore<CodesetStore>()(() => ({
    codesets,
  }))

export { type CodesetStore, createCodesetStore }
