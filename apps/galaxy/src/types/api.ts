interface ActionSuccessState<T = undefined> {
  state: 'success'
  data: T
  total?: number
}

interface ActionErrorState {
  state: 'error'
  status?: number
  error: string
}

type ActionResult<T> = ActionSuccessState<T> | ActionErrorState

interface NetworkSuccessState<T> {
  state: 'success'
  data: T
  headers: Headers
}

interface NetworkErrorState {
  state: 'error'
  status?: number
  error: string
  headers: Headers
}

type NetworkResult<T> = NetworkSuccessState<T> | NetworkErrorState

interface GetOptions extends RequestInit {
  ignoreHeaders?: boolean
}

export type {
  NetworkResult,
  GetOptions,
  ActionSuccessState,
  ActionErrorState,
  ActionResult,
}
