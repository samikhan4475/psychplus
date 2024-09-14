'use client'

import { addDays, eachDayOfInterval, format } from 'date-fns'
import { StateCreator } from 'zustand'
import { shallow } from 'zustand/shallow'
import { createWithEqualityFn } from 'zustand/traditional'
import { CodeSetState, createCodeSetStore } from '@psychplus/codeset'
import { AuthorityCodeSets } from '@psychplus/patient-info'
import { combineStateCreators } from '@psychplus/utils/store'
import type {
  AppointmentDate,
  AppointmentAvailability,
  Provider,
} from './types'

interface ProvidersState {
  providers: Provider[]
  setProviders: (providers: Provider[]) => void
}

const createProvidersStore: StateCreator<ProvidersState> = (set) => ({
  providers: [],
  setProviders: (providers: Provider[]) => set({ providers }),
})

interface LanguageCodeSetsState {
  languageCodeSets: AuthorityCodeSets
  setLanguageCodeSets: (codes: AuthorityCodeSets) => void
}

const createLanguageCodeSetStore: StateCreator<LanguageCodeSetsState> = (
  set,
) => ({
  languageCodeSets: {
    codeSystemName: '',
    displayName: '',
    codes: [],
  },
  setLanguageCodeSets: (languageCodeSets: AuthorityCodeSets) =>
    set({ languageCodeSets }),
})

interface UsStatesCodeSetsState {
  usStatesCodeSets: AuthorityCodeSets
  setUsStatesCodeSets: (codes: AuthorityCodeSets) => void
}

const createUsStatesCodeSetsStore: StateCreator<UsStatesCodeSetsState> = (
  set,
) => ({
  usStatesCodeSets: {
    codeSystemName: '',
    displayName: '',
    codes: [],
  },
  setUsStatesCodeSets: (usStatesCodeSets: AuthorityCodeSets) =>
    set({ usStatesCodeSets }),
})

interface AppointmentAvailabilityState {
  appointmentAvailabilities: AppointmentAvailability[]
  setAppointmentAvailabilities: (
    value: AppointmentAvailability[],
  ) => void
}

const createServerAppointmentStore: StateCreator<AppointmentAvailabilityState> = (
  set,
) => ({
  appointmentAvailabilities: [],
  setAppointmentAvailabilities: (
    appointmentAvailabilities: AppointmentAvailability[],
  ) =>
    set({
      appointmentAvailabilities,
    }),
})

interface State {
  appointmentDays: AppointmentDate[]
  setAppointmentDates: (
    value: Date,
  ) => void
}

// interface for days

const createStore: StateCreator<State> = (set) => ({
  staffAppointmentAvailabilities: [],
  mappedAppointmentAvailabilities: [],
  appointmentDays: [],
  setAppointmentDates(startDate) {
    set({
      appointmentDays: createDays(startDate),
    })
  },
})

const createDays = (
  startDate: Date = new Date(),
): AppointmentDate[] => {
  const dates = eachDayOfInterval({
    start: startDate,
    end: addDays(startDate, 13),
  })

  return dates.map((date) => ({
    date: date,
    day: format(date, 'EEE'),
    monthAndDay: format(date, 'MM/dd'),
  }))
}

type AppointmentAvailabilityStoreType = State &
  UsStatesCodeSetsState &
  CodeSetState &
  LanguageCodeSetsState &
  ProvidersState &
  AppointmentAvailabilityState

const useStore = createWithEqualityFn<AppointmentAvailabilityStoreType>(
  combineStateCreators(
    createStore,
    createUsStatesCodeSetsStore,
    createCodeSetStore,
    createLanguageCodeSetStore,
    createProvidersStore,
    createServerAppointmentStore,
  ),
  shallow,
)

export { useStore, type AppointmentAvailabilityStoreType }
