import { createContext, useContext, useRef } from 'react'
import { getPatientCreditCards } from '@/actions'
import { CreditCard } from '@/types'
import { PaymentMap } from '../../types'
import { useStore as zustandUseStore, type StoreApi } from 'zustand'
import { createStore as zustandCreateStore } from 'zustand/vanilla'
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

  const StoreContext = createContext<StoreApi<Store> | undefined>(undefined)
  
const StoreProvider = ({ children }: React.PropsWithChildren) => {
  const storeRef = useRef<StoreApi<Store>>()

  if (!storeRef.current) {
    storeRef.current = createStore()
  }

  return (
    <StoreContext.Provider value={storeRef.current}>
      {children}
    </StoreContext.Provider>
  )
}
  
  const useStore = <T,>(selector: (store: Store) => T): T => {
    const context = useContext(StoreContext)
  
    if (!context) {
      throw new Error(`useStore must be use within StoreProvider`)
    }
  
    return zustandUseStore(context, selector)
  }


  export { StoreProvider, useStore, createStore }
