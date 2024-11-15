import { createContext } from 'react'
import { createStore as zustandCreateStore } from 'zustand'
import { Sort } from '@/types'
import { getNewSortDir } from '@/utils'
import { getPatientAllergiesAction } from '../actions'
import type { AllergiesSearchParams, AllergyDataResponse } from '../types'

interface StoreInit {
  patientId: string
}

interface StoreState {
  allergiesListData?: AllergyDataResponse[]
  allergiesListLoading?: boolean
  allergiesListError?: string
  allergiesListPayload?: AllergiesSearchParams
  sort?: Sort
  patientId: string
  sortData: (column: string) => void
  allergiesListSearch: (
    payload?: AllergiesSearchParams,
    reset?: boolean,
  ) => void
}

type Store = ReturnType<typeof createStore>

const createStore = (init: StoreInit) => {
  return zustandCreateStore<StoreState>()((set, get) => ({
    allergiesListSearch: async (payload?: AllergiesSearchParams) => {
      set({
        allergiesListError: undefined,
        allergiesListLoading: true,
        allergiesListPayload: payload,
      })
      const { patientId, sort } = get()
      const updatedPayload = {
        ...payload,
        patientIds: [patientId],
      }
      const result = await getPatientAllergiesAction({
        payload: updatedPayload,
        sort,
      })

      if (result.state === 'error') {
        return set({
          allergiesListError: result.error,
          allergiesListLoading: false,
        })
      }
      set({
        allergiesListData: result.data,
        allergiesListLoading: false,
      })
    },

    allergiesListData: undefined,
    sort: undefined,
    sortData: (column) => {
      set({
        sort: {
          column,
          direction: getNewSortDir(column, get().sort),
        },
      })
      get().allergiesListSearch(get().allergiesListPayload, true)
    },
    patientId: init.patientId,
  }))
}

const StoreContext = createContext<Store | null>(null)

export { createStore, StoreContext, type Store, type StoreInit }
