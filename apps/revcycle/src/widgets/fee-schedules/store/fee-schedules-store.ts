import { type StateCreator } from 'zustand'
import { CodeSetState, createCodeSetStore } from '@psychplus/codeset'
import { FeeSchedule } from '../types'

interface FeeSchedulesState extends CodeSetState {
  feeSchedules: FeeSchedule[]
}

const DUMMY_FEE_SCHEDULES: FeeSchedule[] = [
  {
    id: '1',
    name: 'New default fee schedule',
    effectiveDate: '12/01/2022',
    termDate: '12/01/2024',
    isActive: true,
  },
  {
    id: '2',
    name: 'River Oaks advanced',
    effectiveDate: '02/01/2023',
    termDate: '02/07/2024',
    isActive: true,
  },
  {
    id: '3',
    name: 'Default fee Schedule for 2022',
    effectiveDate: '01/01/2022',
    termDate: '31/12/2022',
    isActive: false,
  },
]

const createFeeSchedulesStore: StateCreator<FeeSchedulesState> = (
  set,
  get,
  store,
) => ({
  ...createCodeSetStore(set, get, store),
  feeSchedules: DUMMY_FEE_SCHEDULES,
})

export { createFeeSchedulesStore, type FeeSchedulesState }
