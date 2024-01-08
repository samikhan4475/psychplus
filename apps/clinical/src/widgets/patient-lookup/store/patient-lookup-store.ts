'use client'

import { type StateCreator, type StoreApi, type UseBoundStore } from 'zustand'
import { createCodeSetStore, type CodeSetState } from '@psychplus/codeset'
import { type Patients } from '../types'
import { GetDropdown, type Dropdown } from './hooks'

interface PatientLookupState extends CodeSetState {
  patients?: Patients[]
  getPatients: () => Patients[] | []
  setPatients: (list: Patients[]) => void
  getDropdowns: (key: string) => Dropdown
}

type PatientLookupStoreType = UseBoundStore<StoreApi<PatientLookupState>>

const createPatientLookupStore: StateCreator<PatientLookupState> = (
  set,
  get,
  store,
) => ({
  ...createCodeSetStore(set, get, store),
  getPatients: () => get().patients || [],
  setPatients: (patients) => set({ patients }),
  getDropdowns: (key) => GetDropdown(key) || [],
})

export {
  type PatientLookupState,
  type PatientLookupStoreType,
  createPatientLookupStore,
}
