import { QUERY_TOKEN } from '../constants'

const forwardQuery = (pathname: string) => {
  const url = new URL(`${location.origin}${pathname}`)

  const originalParams = new URLSearchParams(location.search)

  const token = originalParams.get(QUERY_TOKEN)
  if (token) {
    url.searchParams.append(QUERY_TOKEN, token)
  }

  return url.toString()
}

export { forwardQuery }
