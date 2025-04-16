import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useRef,
} from 'react'
import { useStore as zustandUseStore, type StoreApi } from 'zustand'

export function createZustandContext<TStore>(
  storeInitializer: () => StoreApi<TStore>,
) {
  const StoreContext = createContext<StoreApi<TStore> | undefined>(undefined)

  const StoreProvider = ({ children }: PropsWithChildren): JSX.Element => {
    const storeRef = useRef<StoreApi<TStore>>()

    if (!storeRef.current) {
      storeRef.current = storeInitializer()
    }

    return (
      <StoreContext.Provider value={storeRef.current}>
        {children}
      </StoreContext.Provider>
    )
  }

  const useStore = <T,>(selector: (store: TStore) => T): T => {
    const context = useContext(StoreContext)
    if (!context) {
      throw new Error('useStore must be used within a StoreProvider')
    }
    return zustandUseStore(context, selector)
  }

  return {
    StoreProvider,
    useStore,
  }
}
