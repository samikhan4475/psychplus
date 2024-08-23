import { useContext, useRef } from 'react'
import { createStore, StoreContext, type Store, type StoreInit } from './store'

type StoreProviderProps = React.PropsWithChildren<StoreInit>

const StoreProvider = ({ children, ...props }: StoreProviderProps) => {
  const storeRef = useRef<Store>()

  if (!storeRef.current) {
    storeRef.current = createStore(props)
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
