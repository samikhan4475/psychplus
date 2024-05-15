import { createJSONStorage, persist } from 'zustand/middleware'
import { createWithEqualityFn } from 'zustand/traditional'
import { createCodeSetStore } from '@psychplus/codeset'
import { createPatientStore } from '@psychplus/patient'
import { combineStateCreators } from '@psychplus/utils/store'
import { type StoreType } from './types'

const useStore = createWithEqualityFn<StoreType>()(
  persist(combineStateCreators(createCodeSetStore, createPatientStore), {
    name: 'patient-dashboard-store',
    storage: createJSONStorage(() => localStorage),
  }),
)

export { useStore }
