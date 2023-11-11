import { StateCreator } from 'zustand'

const combineStateCreators =
  <TState>(...stateCreators: StateCreator<any>[]): StateCreator<TState> =>
  (set, get, api) => {
    let values: any = {}

    stateCreators.forEach((sc) => {
      values = { ...values, ...sc(set, get, api) }
    })
    return values
  }

export { combineStateCreators }
