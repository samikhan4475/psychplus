import { useContext, useRef } from 'react'
import { createStore, StoreContext, type Store } from './store'

type StoreProviderProps = React.PropsWithChildren

const StoreProvider = ({ children }: StoreProviderProps) => {
  const storeRef = useRef<Store>()

  if (!storeRef.current) {
    storeRef.current = createStore()
  }

  return (
    <StoreContext.Provider value={storeRef.current}>
      {children}
    </StoreContext.Provider>
  )
}

const useStore = () => {
  const store = useContext(StoreContext)

  if (!store) {
    throw new Error('useStore must be used within a StoreProvider')
  }

  return store
}

export { StoreProvider, useStore }
