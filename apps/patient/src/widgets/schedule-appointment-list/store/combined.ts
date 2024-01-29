import { createJSONStorage, persist } from 'zustand/middleware'
import { createWithEqualityFn } from 'zustand/traditional'
import { createCodeSetStore } from '@psychplus/codeset'
import { combineStateCreators } from '@psychplus/utils/store'
import { createAppointmentFiltersStore } from './appointments-filters-store'
import { createAppointmentsStore } from './appointments-store'
import { createPatientStore } from './patient-store'
import { type StoreType } from './types'

const useStore = createWithEqualityFn<StoreType>()(
  persist(
    combineStateCreators(
      createAppointmentsStore,
      createCodeSetStore,
      createAppointmentFiltersStore,
      createPatientStore,
    ),

    {
      name: 'scheduling-appointment-store',
      storage: createJSONStorage(() => localStorage),
    },
  ),
)

export { useStore }
