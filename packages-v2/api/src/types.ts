interface GetOptions extends RequestInit {
  ignoreHeaders?: boolean
}

interface NetworkErrorState {
  state: 'error'
  status?: number
  error: string
  headers: Headers
}

type ActionResult<T> = ActionSuccessState<T> | ActionErrorState

interface NetworkSuccessState<T> {
  state: 'success'
  data: T
  headers: Headers
}

type NetworkResult<T> = NetworkSuccessState<T> | NetworkErrorState

interface ActionErrorState {
  state: 'error'
  status?: number
  error: string
}

interface ActionSuccessState<T = undefined> {
  state: 'success'
  data: T
  total?: number
}
export type {
  NetworkResult,
  GetOptions,
  ActionSuccessState,
  ActionErrorState,
  ActionResult,
}
