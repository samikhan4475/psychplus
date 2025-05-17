import { create } from 'zustand'
import { Sort } from '@/types'
import { getNewSortDir } from '@/utils'
import { getPatientAllergiesAction } from '../client-actions'
import type { AllergiesSearchParams, AllergyDataResponse } from '../types'

interface Store {
  allergiesListData?: AllergyDataResponse[]
  allergiesListLoading?: boolean
  allergiesListError?: string
  allergiesListPayload?: AllergiesSearchParams
  allergiesError: boolean
  setAllergiesError: (hasAllergies: boolean) => void
  sort?: Sort
  sortData: (column: string) => void
  allergiesListSearch: (
    patientId: string,
    payload?: AllergiesSearchParams,
    reset?: boolean,
  ) => Promise<void>
}

const useStore = create<Store>((set, get) => ({
  allergiesError: false,
  setAllergiesError: (allergiesError: boolean) => {
    set({ allergiesError })
  },
  allergiesListSearch: async (
    patientId: string,
    payload?: AllergiesSearchParams,
  ) => {
    const updatedPayload = {
      ...payload,
      patientIds: [patientId],
    }
    set({
      allergiesListError: undefined,
      allergiesListLoading: true,
      allergiesListData: undefined,
      allergiesListPayload: payload,
      allergiesError: false,
    })
    const { sort } = get()

    const result = await getPatientAllergiesAction({
      payload: updatedPayload,
      sort,
    })

    if (result.state === 'error') {
      return set({
        allergiesListError: result.error,
        allergiesListLoading: false,
        allergiesListData: [],
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
    const { allergiesListPayload } = get()
    get().allergiesListSearch(
      allergiesListPayload?.patientIds?.[0] || '',
      allergiesListPayload,
      true,
    )
  },
}))

export { useStore }
