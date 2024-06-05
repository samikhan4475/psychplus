'use client'

import { type StateCreator } from 'zustand'
import { createCodeSetStore } from '@psychplus/codeset'
import { CodingSetPOSState } from './types'

const codingPosStore: StateCreator<CodingSetPOSState> = (set, get, store) => ({
  ...createCodeSetStore(set, get, store),
  codingPosList: [],
})

export { codingPosStore }
