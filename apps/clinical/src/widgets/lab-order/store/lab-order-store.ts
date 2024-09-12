'use client'

import { type StateCreator } from 'zustand'
import { createCodeSetStore } from '@psychplus/codeset'
import { GetDropdown } from './hooks'

const labOrdersStore: StateCreator<any> = (
  set,
  get,
  store,
) => ({
  ...createCodeSetStore(set, get, store),
  getDropdowns: (key:any) => GetDropdown(key) || [],
})

export { labOrdersStore }
