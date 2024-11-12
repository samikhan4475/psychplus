import { create as actualCreate, StateCreator } from 'zustand'

const storeResetFns = new Set<() => void>()

const resetAllStores = () => {
  storeResetFns.forEach((resetFn) => resetFn())
}

const create = <T>() => {
  return (stateCreator: StateCreator<T>) => {
    const store = actualCreate(stateCreator)
    const initialState = store.getState()
    storeResetFns.add(() => store.setState(initialState, true))

    return store
  }
}

export { resetAllStores, create }
