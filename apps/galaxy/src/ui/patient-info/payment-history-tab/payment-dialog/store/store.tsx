import { createStore as zustandCreateStore } from 'zustand/vanilla'
import { getPatientCreditCards } from '@/actions'
import { CreditCard } from '@/types'
import { createZustandContext } from '@/utils/createZustandContext'
import { PaymentMap } from '../../types'

interface Store {
  patientCards?: CreditCard[]
  error?: string
  loading?: boolean
  fetchPatientCreditCards: (patientId: string) => void
  coPayMap: PaymentMap
  coInsuranceMap: PaymentMap
  setCoPayMap: (map: PaymentMap) => void
  setCoInsuranceMap: (map: PaymentMap) => void
  toggleAddCardDialog: () => void
  openAddCardDialog: boolean
}

const createStore = () =>
  zustandCreateStore<Store>()((set, get) => ({
    patientCards: undefined,
    error: undefined,
    loading: undefined,
    coPayMap: {},
    coInsuranceMap: {},
    setCoPayMap: (map) => set({ coPayMap: map }),
    setCoInsuranceMap: (map) => set({ coInsuranceMap: map }),

    fetchPatientCreditCards: async (patientId: string) => {
      set({
        error: undefined,
        loading: true,
      })

      const result = await getPatientCreditCards(patientId)

      if (result.state === 'error') {
        return set({
          error: result.error,
          loading: false,
        })
      }

      set({
        patientCards: result.data,
        loading: false,
      })
    },
    openAddCardDialog: false,
    toggleAddCardDialog: () =>
      set((state) => ({ openAddCardDialog: !state.openAddCardDialog })),
  }))

const { StoreProvider, useStore } = createZustandContext<Store>(createStore)

export { StoreProvider, useStore, createStore }
